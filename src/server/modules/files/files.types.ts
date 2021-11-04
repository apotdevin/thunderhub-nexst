export type EncodingType = 'hex' | 'utf-8';
export type BitcoinNetwork = 'mainnet' | 'regtest' | 'testnet';

export type AccountType = {
  name?: string;
  serverUrl?: string;
  lndDir?: string;
  network?: BitcoinNetwork;
  macaroonPath?: string;
  certificatePath?: string;
  password?: string | null;
  macaroon?: string;
  certificate?: string;
  encrypted?: boolean;
};

export type UnresolvedAccountType = {
  name?: string;
  serverUrl?: string;
  lndDir?: string;
  network?: BitcoinNetwork;
  macaroonPath?: string;
  certificatePath?: string;
  password?: string | null;
  macaroon?: string;
  certificate?: string;
  encrypted?: boolean | string;
};

export type ParsedAccount = {
  name: string;
  id: string;
  socket: string;
  macaroon: string;
  cert: string;
  password: string;
} & EncryptedAccount;

export type EncryptedAccount =
  | {
      encrypted: true;
      encryptedMacaroon: string;
    }
  | {
      encrypted: false;
    };

export type AccountConfigType = {
  hashed: boolean | null;
  masterPassword: string | null;
  defaultNetwork: string | null;
  accounts: AccountType[];
};
