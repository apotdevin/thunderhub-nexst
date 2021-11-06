import { Context, Query, Resolver } from '@nestjs/graphql';
import { ContextType } from 'src/server/app.module';
import { AccountsService } from '../../accounts/accounts.service';
import { Public } from '../../security/security.decorators';
import { ServerAccount } from './account.types';

@Resolver()
export class AccountResolver {
  constructor(private accountsService: AccountsService) {}

  @Query(() => Boolean)
  async getAccount() {
    return true;
  }

  @Public()
  @Query(() => [ServerAccount])
  async getServerAccounts(@Context() { authToken }: ContextType) {
    const currentAccount = this.accountsService.getAccount(authToken?.sub);
    const accounts = this.accountsService.getAllAccounts();

    const mapped = [];

    for (const key in accounts) {
      if (Object.prototype.hasOwnProperty.call(accounts, key)) {
        const account = accounts[key];
        const { name, hash } = account;

        if (currentAccount?.hash === 'sso' || key !== 'sso') {
          mapped.push({
            name,
            id: hash,
            loggedIn: currentAccount?.hash === key,
            type: key === 'sso' ? 'sso' : 'server',
          });
        }
      }
    }

    return mapped;
  }
}
