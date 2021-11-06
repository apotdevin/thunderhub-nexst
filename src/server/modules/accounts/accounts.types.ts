import { ParsedAccount } from '../files/files.types';

export type EnrichedAccount = {
  hash: string;
  lnd: any;
} & ParsedAccount;
