import { Inject } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { toWithError } from 'src/server/utils/async';
import { Logger } from 'winston';
import { NodeService } from '../../node/node.service';
import { CurrentUser } from '../../security/security.decorators';
import { UserId } from '../../security/security.types';
import { getChannelAge } from './channels.helpers';
import {
  Channel,
  ClosedChannel,
  OpenOrCloseChannel,
  PendingChannel,
  SingleChannel,
  SingleChannelParentType,
} from './channels.types';

@Resolver(Channel)
export class ChannelResolver {
  constructor(
    private nodeService: NodeService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  @ResolveField()
  async pending_resume(@Parent() { pending_payments }: Channel) {
    const total = pending_payments.reduce(
      (prev, current) => {
        const { is_outgoing, tokens } = current;

        return {
          incoming_tokens: is_outgoing
            ? prev.incoming_tokens
            : prev.incoming_tokens + tokens,
          outgoing_tokens: is_outgoing
            ? prev.outgoing_tokens + tokens
            : prev.outgoing_tokens,
          incoming_amount: is_outgoing
            ? prev.incoming_amount
            : prev.incoming_amount + 1,
          outgoing_amount: is_outgoing
            ? prev.incoming_amount + 1
            : prev.incoming_amount,
        };
      },
      {
        incoming_tokens: 0,
        outgoing_tokens: 0,
        incoming_amount: 0,
        outgoing_amount: 0,
      }
    );

    return {
      ...total,
      total_tokens: total.incoming_tokens + total.outgoing_tokens,
      total_amount: total.incoming_amount + total.outgoing_amount,
    };
  }

  @ResolveField()
  async partner_fee_info(
    @CurrentUser() user: UserId,
    @Parent()
    { id, partner_fee_info: { localKey } }: SingleChannelParentType
  ) {
    const [channel, error] = await toWithError(
      this.nodeService.getChannel(user.id, id)
    );

    if (error) {
      this.logger.debug(`Error getting channel with id ${id}: %o`, error);
      return null;
    }

    let node_policies = null;
    let partner_node_policies = null;

    if (channel) {
      channel.policies.forEach(policy => {
        if (localKey && localKey === policy.public_key) {
          node_policies = {
            ...policy,
            node: { publicKey: policy.public_key },
          };
        } else {
          partner_node_policies = {
            ...policy,
            node: { publicKey: policy.public_key },
          };
        }
      });
    }

    return {
      ...channel,
      node_policies,
      partner_node_policies,
    };
  }
}

@Resolver()
export class ChannelsResolver {
  constructor(
    private nodeService: NodeService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {}

  @Query(() => SingleChannel)
  async getChannel(
    @CurrentUser() user: UserId,
    @Args('pubkey') pubkey: string,
    @Args('id') id: string
  ) {
    const channel = await this.nodeService.getChannel(user.id, id);

    if (!pubkey) {
      return channel;
    }

    let node_policies = null;
    let partner_node_policies = null;

    channel.policies.forEach(policy => {
      if (pubkey && pubkey === policy.public_key) {
        node_policies = {
          ...policy,
          node: { publicKey: policy.public_key },
        };
      } else {
        partner_node_policies = {
          ...policy,
          node: { publicKey: policy.public_key },
        };
      }
    });

    return {
      ...channel,
      node_policies,
      partner_node_policies,
    };
  }

  @Query(() => [Channel])
  async getChannels(
    @CurrentUser() { id }: UserId,
    @Args('active', { nullable: true }) is_active?: boolean
  ) {
    const { public_key, current_block_height } =
      await this.nodeService.getWalletInfo(id);

    const { channels } = await this.nodeService.getChannels(id, { is_active });

    return channels.map(channel => ({
      ...channel,
      time_offline: Math.round((channel.time_offline || 0) / 1000),
      time_online: Math.round((channel.time_online || 0) / 1000),
      partner_node_info: { publicKey: channel.partner_public_key },
      partner_fee_info: { localKey: public_key },
      channel_age: getChannelAge(channel.id, current_block_height),
    }));
  }

  @Query(() => [ClosedChannel])
  async getClosedChannels(@CurrentUser() { id }: UserId) {
    const { current_block_height } = await this.nodeService.getWalletInfo(id);

    const { channels } = await this.nodeService.getClosedChannels(id);

    return channels.map(channel => ({
      ...channel,
      partner_node_info: {
        publicKey: channel.partner_public_key,
      },
      channel_age: getChannelAge(channel.id, current_block_height),
    }));
  }

  @Query(() => [PendingChannel])
  async getPendingChannels(@CurrentUser() { id }: UserId) {
    const { pending_channels } = await this.nodeService.getPendingChannels(id);

    return pending_channels.map(channel => ({
      ...channel,
      partner_node_info: {
        publicKey: channel.partner_public_key,
      },
    }));
  }

  @Mutation(() => OpenOrCloseChannel)
  async closeChannel(
    @CurrentUser() user: UserId,
    @Args('id') id: string,
    @Args('targetConfirmations') target_confirmations: number,
    @Args('tokensPerVByte') tokens_per_vbyte: number,
    @Args('forceClose') is_force_close: boolean
  ) {
    const closeParams = {
      id,
      target_confirmations,
      tokens_per_vbyte,
      is_force_close,
    };

    this.logger.info('Closing channel with params: %o', closeParams);

    const info = await this.nodeService.closeChannel(user.id, closeParams);

    this.logger.info('Channel closed: %o', id);

    return {
      transactionId: info.transaction_id,
      transactionOutputIndex: info.transaction_vout,
    };
  }

  @Mutation(() => OpenOrCloseChannel)
  async openChannel(
    @CurrentUser() user: UserId,
    @Args('amount') local_tokens: number,
    @Args('partnerPublicKey') partner_public_key: string,
    @Args('isPrivate', { nullable: true }) is_private: boolean,
    @Args('pushTokens', { nullable: true, defaultValue: 0 }) pushTokens: number,
    @Args('tokensPerVByte', { nullable: true })
    chain_fee_tokens_per_vbyte: number
  ) {
    let public_key = partner_public_key;

    if (partner_public_key.indexOf('@') >= 0) {
      const parts = partner_public_key.split('@');
      public_key = parts[0];
      await this.nodeService.addPeer(user.id, public_key, parts[1], false);
    }

    const openParams = {
      is_private,
      local_tokens,
      chain_fee_tokens_per_vbyte,
      partner_public_key: public_key,
      give_tokens: Math.min(pushTokens, local_tokens),
    };

    this.logger.info('Opening channel with params: %o', openParams);

    const info = await this.nodeService.openChannel(user.id, openParams);

    this.logger.info('Channel opened');

    return {
      transactionId: info.transaction_id,
      transactionOutputIndex: info.transaction_vout,
    };
  }
}
