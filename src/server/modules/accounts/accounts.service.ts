import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilesService } from '../files/files.service';
import { authenticatedLndGrpc } from 'ln-service';
import { getSHA256Hash } from 'src/server/utils/crypto';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { EnrichedAccount } from './accounts.types';

@Injectable()
export class AccountsService {
  accounts: { [key: string]: EnrichedAccount } = {};

  constructor(
    private configService: ConfigService,
    private filesService: FilesService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) {
    // Initialize cookie file if cookie path is provided
    filesService.readCookie();

    const macaroonPath = this.configService.get('sso.macaroonPath');
    const certPath = this.configService.get('sso.certPath');
    const accountConfigPath = this.configService.get('accountConfigPath');

    const ssoUrl = this.configService.get('sso.serverUrl');
    const ssoMacaroon = this.filesService.readMacaroons(macaroonPath);
    const ssoCert = this.filesService.readFile(certPath);

    if (ssoUrl && ssoMacaroon) {
      if (!ssoCert) {
        this.logger.warning(
          'No certificate provided for SSO account. Make sure you do not need it to connect.'
        );
      }

      const sso = {
        name: '',
        id: '',
        password: '',
        encrypted: false,
        encryptedMacaroon: '',
        macaroon: ssoMacaroon,
        socket: ssoUrl,
        cert: ssoCert,
      };
      const ssoHash = getSHA256Hash(JSON.stringify(sso));
      const { lnd } = authenticatedLndGrpc(sso);

      this.accounts['sso'] = { ...sso, hash: ssoHash, lnd };
    }

    const accounts = this.filesService.getAccounts(accountConfigPath);

    if (!accounts.length) return;

    accounts.forEach(account => {
      const { socket, cert, macaroon } = account;
      const hash = getSHA256Hash(JSON.stringify({ socket, cert, macaroon }));
      const { lnd } = authenticatedLndGrpc({ socket, cert, macaroon });

      this.accounts[hash] = { ...account, hash, lnd };
    }, {});
  }

  getAccount(id: string) {
    return this.accounts[id] || null;
  }
}
