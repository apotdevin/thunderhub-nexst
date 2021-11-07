import { Injectable } from '@nestjs/common';
import {
  BackupChannel,
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
  getWalletVersion,
  verifyBackups,
  recoverFundsFromChannels,
  getBackups,
  verifyMessage,
  signMessage,
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

  async getWalletVersion(account: EnrichedAccount) {
    return to(
      getWalletVersion({
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

  async verifyBackups(
    account: EnrichedAccount,
    backup: string,
    channels: BackupChannel[]
  ) {
    return to<{ is_valid: boolean }>(
      verifyBackups({
        lnd: account.lnd,
        backup,
        channels,
      })
    );
  }

  async recoverFundsFromChannels(account: EnrichedAccount, backup: string) {
    return to<void>(
      recoverFundsFromChannels({
        lnd: account.lnd,
        backup,
      })
    );
  }

  async getBackups(account: EnrichedAccount) {
    return to<{ backup: string; channels: BackupChannel[] }>(
      getBackups({ lnd: account.lnd })
    );
  }

  async verifyMessage(
    account: EnrichedAccount,
    message: string,
    signature: string
  ) {
    return to<{ signed_by: string }>(
      verifyMessage({ lnd: account.lnd, message, signature })
    );
  }

  async signMessage(account: EnrichedAccount, message: string) {
    return to<{ signature: string }>(
      signMessage({ lnd: account.lnd, message })
    );
  }
}
