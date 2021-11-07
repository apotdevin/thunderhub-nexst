import { Injectable } from '@nestjs/common';
import {
  ClosedChannelsType,
  GetChainBalanceType,
  GetChannelBalanceType,
  GetChannelsType,
  GetNodeType,
  GetPendingChainBalanceType,
  GetPendingChannelsType,
  GetWalletInfoType,
} from './lnd.types';
import {
  getWalletInfo,
  getClosedChannels,
  getPendingChannels,
  getNode,
  getChannels,
  getChainBalance,
  getPendingChainBalance,
  getChannelBalance,
} from 'ln-service';
import { EnrichedAccount } from '../../accounts/accounts.types';
import { to } from './lnd.helpers';

@Injectable()
export class LndService {
  async getWalletInfo(account: EnrichedAccount) {
    return to<GetWalletInfoType>(
      getWalletInfo({
        lnd: account.lnd,
      })
    );
  }

  async getClosedChannels(account: EnrichedAccount) {
    return to<ClosedChannelsType>(
      getClosedChannels({
        lnd: account.lnd,
      })
    );
  }

  async getPendingChannels(account: EnrichedAccount) {
    return to<GetPendingChannelsType>(
      getPendingChannels({
        lnd: account.lnd,
      })
    );
  }

  async getChannels(account: EnrichedAccount) {
    return to<GetChannelsType>(
      getChannels({
        lnd: account.lnd,
      })
    );
  }

  async getChannelBalance(account: EnrichedAccount) {
    return to<GetChannelBalanceType>(
      getChannelBalance({
        lnd: account.lnd,
      })
    );
  }

  async getChainBalance(account: EnrichedAccount) {
    return to<GetChainBalanceType>(
      getChainBalance({
        lnd: account.lnd,
      })
    );
  }

  async getPendingChainBalance(account: EnrichedAccount) {
    return to<GetPendingChainBalanceType>(
      getPendingChainBalance({
        lnd: account.lnd,
      })
    );
  }

  async getNode(
    account: EnrichedAccount,
    public_key: string,
    is_omitting_channels = true
  ) {
    return to<GetNodeType>(
      getNode({
        lnd: account.lnd,
        public_key,
        is_omitting_channels,
      })
    );
  }
}
