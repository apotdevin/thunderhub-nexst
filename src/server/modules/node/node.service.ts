import { Injectable } from '@nestjs/common';
import { AccountsService } from '../accounts/accounts.service';
import { LndService } from './lnd/lnd.service';

@Injectable()
export class NodeService {
  constructor(
    private accountsService: AccountsService,
    private lndService: LndService
  ) {}

  getWalletInfo(id: string) {
    const account = this.accountsService.getAccount(id);
    if (!account) throw new Error('Node account not found');
    return this.lndService.getWalletInfo(account);
  }
}
