import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { LndService } from './lnd/lnd.service';

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
}
