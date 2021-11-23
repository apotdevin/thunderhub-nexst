import { Injectable } from '@nestjs/common';
import {
  BackupChannel,
  ClosedChannelsType,
  CreateInvoiceParams,
  CreateInvoiceType,
  DecodedType,
  DiffieHellmanComputeSecretParams,
  DiffieHellmanComputeSecretResult,
  GetChainBalanceType,
  GetChainTransactionsType,
  GetChannelBalanceType,
  GetChannelsType,
  GetNodeType,
  GetPeers,
  GetPendingChainBalanceType,
  GetPendingChannelsType,
  GetUtxosType,
  GetWalletInfoType,
  GrantAccess,
  NetworkInfo,
  PayInvoiceParams,
  PayInvoiceType,
  Permissions,
  SendToChainAddressType,
  SendToChainParams,
  SignMessage,
  VerifyMessage,
} from './lnd.types';
import {
  diffieHellmanComputeSecret,
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
  grantAccess,
  getNetworkInfo,
  getPeers,
  addPeer,
  getChainTransactions,
  getUtxos,
  createChainAddress,
  sendToChainAddress,
  decodePaymentRequest,
  pay,
  createInvoice,
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
    return to<VerifyMessage>(
      verifyMessage({ lnd: account.lnd, message, signature })
    );
  }

  async signMessage(account: EnrichedAccount, message: string) {
    return to<SignMessage>(signMessage({ lnd: account.lnd, message }));
  }

  async grantAccess(account: EnrichedAccount, permissions: Permissions) {
    return to<GrantAccess>(grantAccess({ lnd: account.lnd, ...permissions }));
  }

  async getNetworkInfo(account: EnrichedAccount) {
    return to<NetworkInfo>(getNetworkInfo({ lnd: account.lnd }));
  }

  async getPeers(account: EnrichedAccount) {
    return to<GetPeers>(getPeers({ lnd: account.lnd }));
  }

  async addPeer(
    account: EnrichedAccount,
    public_key: string,
    socket: string,
    is_temporary: boolean
  ) {
    return to<void>(
      addPeer({ lnd: account.lnd, public_key, socket, is_temporary })
    );
  }

  async removePeer(account: EnrichedAccount, public_key: string) {
    return to<void>(getPeers({ lnd: account.lnd, public_key }));
  }

  async getChainTransactions(account: EnrichedAccount) {
    return to<GetChainTransactionsType>(
      getChainTransactions({ lnd: account.lnd })
    );
  }

  async getUtxos(account: EnrichedAccount) {
    return to<GetUtxosType>(getUtxos({ lnd: account.lnd }));
  }

  async createChainAddress(account: EnrichedAccount) {
    return to<{ address: string }>(
      createChainAddress({
        lnd: account.lnd,
        is_unused: true,
        format: 'p2wpkh',
      })
    );
  }

  async sendToChainAddress(
    account: EnrichedAccount,
    options: SendToChainParams
  ) {
    return to<SendToChainAddressType>(
      sendToChainAddress({ lnd: account.lnd, ...options })
    );
  }

  async diffieHellmanComputeSecret(
    account: EnrichedAccount,
    options: DiffieHellmanComputeSecretParams
  ) {
    return to<DiffieHellmanComputeSecretResult>(
      diffieHellmanComputeSecret({ lnd: account.lnd, ...options })
    );
  }

  async decodePaymentRequest(account: EnrichedAccount, request: string) {
    return to<DecodedType>(decodePaymentRequest({ lnd: account.lnd, request }));
  }

  async pay(account: EnrichedAccount, options: PayInvoiceParams) {
    return to<PayInvoiceType>(pay({ lnd: account.lnd, ...options }));
  }

  async createInvoice(account: EnrichedAccount, options: CreateInvoiceParams) {
    return to<CreateInvoiceType>(
      createInvoice({ lnd: account.lnd, ...options })
    );
  }
}
