import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FilesService } from '../files/files.service';
import { authenticatedLndGrpc } from 'ln-service';
import { getSHA256Hash } from 'src/server/utils/crypto';

@Injectable()
export class AccountsService {
  accounts = {};

  constructor(
    private configService: ConfigService,
    private filesService: FilesService
  ) {
    // Initialize cookie file if cookie path is provided
    filesService.readCookie();

    const macaroonPath = this.configService.get('sso.macaroonPath');
    const certPath = this.configService.get('sso.certPath');
    const accountConfigPath = this.configService.get('accountConfigPath');

    const ssoUrl = this.configService.get('sso.serverUrl');
    const ssoMacaroon = this.filesService.readMacaroons(macaroonPath);
    const ssoCert = this.filesService.readFile(certPath);

    const sso = {
      macaroon: ssoMacaroon,
      socket: ssoUrl,
      cert: ssoCert,
    };
    const ssoHash = getSHA256Hash(JSON.stringify(sso));
    const { lnd } = authenticatedLndGrpc(sso);

    this.accounts['sso'] = { ...sso, hash: ssoHash, lnd };

    const accounts = this.filesService.getAccounts(accountConfigPath);

    if (!accounts.length) return;

    const mapped = accounts.reduce((p, account) => {
      const { socket, cert, macaroon } = account;
      const hash = getSHA256Hash(JSON.stringify({ socket, cert, macaroon }));
      const { lnd } = authenticatedLndGrpc({ socket, cert, macaroon });

      return { ...p, [hash]: { ...account, hash, lnd } };
    }, {});

    this.accounts = { ...this.accounts, ...mapped };
  }
}
