import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { LndService } from './lnd/lnd.service';
import { BackupChannel, Permissions } from './lnd/lnd.types';

@Injectable()
export class NodeService {
  constructor(
    private accountsService: AccountsService,
    private lndService: LndService
  ) {}

  async getWalletInfo(id: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.getWalletInfo(account);
  }

  async getWalletVersion(id: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.getWalletVersion(account);
  }

  async getClosedChannels(id: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.getClosedChannels(account);
  }

  async getPendingChannels(id: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.getPendingChannels(account);
  }

  async getChannels(id: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.getChannels(account);
  }

  async getChannelBalance(id: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.getChannelBalance(account);
  }

  async getChainBalance(id: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.getChainBalance(account);
  }

  async getPendingChainBalance(id: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.getPendingChainBalance(account);
  }

  async getNode(id: string, pubkey: string, withoutChannels: boolean) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.getNode(account, pubkey, withoutChannels);
  }

  async verifyBackups(id: string, backup: string, channels: BackupChannel[]) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.verifyBackups(account, backup, channels);
  }

  async recoverFundsFromChannels(id: string, backup: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.recoverFundsFromChannels(account, backup);
  }

  async getBackups(id: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.getBackups(account);
  }

  async verifyMessage(id: string, message: string, signature: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.verifyMessage(account, message, signature);
  }

  async signMessage(id: string, message: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.signMessage(account, message);
  }

  async grantAccess(id: string, permissions: Permissions) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.grantAccess(account, permissions);
  }

  async getNetworkInfo(id: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.getNetworkInfo(account);
  }

  async getPeers(id: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.getPeers(account);
  }

  async addPeer(
    id: string,
    public_key: string,
    socket: string,
    is_temporary: boolean
  ) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.addPeer(account, public_key, socket, is_temporary);
  }

  async removePeer(id: string, public_key: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.removePeer(account, public_key);
  }
}
