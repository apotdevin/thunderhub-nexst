import { Injectable } from '@nestjs/common';
import { GetWalletInfoType } from './lnd.types';
import { getWalletInfo } from 'ln-service';
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
}
