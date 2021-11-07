export type LndObject = any;

export type PayInvoiceType = {
  fee: number;
  fee_mtokens: string;
  hops: [
    {
      channel: string;
      channel_capacity: number;
      fee_mtokens: string;
      forward_mtokens: string;
      timeout: number;
    }
  ];
  id: string;
  is_confirmed: boolean;
  is_outgoing: boolean;
  mtokens: string;
  secret: string;
  safe_fee: number;
  safe_tokens: number;
  tokens: number;
};

export type ChannelType = {
  id: string;
  tokens: number;
  is_partner_initiated: boolean;
  commit_transaction_fee: number;
  is_active: boolean;
  local_balance: number;
  remote_balance: number;
  partner_public_key: string;
  time_offline?: number;
  time_online?: number;
  pending_payments: [
    { id: string; is_outgoing: boolean; timeout: number; tokens: number }
  ];
};

export type DecodedType = {
  destination: string;
  tokens: number;
};

export type GetPublicKeyType = {
  public_key: string;
};

export type ClosedChannelsType = {
  channels: [];
};

export type CreateInvoiceType = {
  chain_address?: string;
  created_at: string;
  description: string;
  id: string;
  mtokens?: string;
  request: string;
  secret: string;
  tokens?: number;
};

export type CloseChannelType = {
  transaction_id: string;
  transaction_vout: number;
};

export type OpenChannelType = {
  transaction_id: string;
  transaction_vout: number;
};

export type InvoiceType = {
  id: string;
  created_at: string;
  confirmed_at: string;
  tokens: number;
  is_confirmed: boolean;
  received: number;
  payments: { messages: [{ type: string; value: string }] }[];
};

export type PaymentType = {
  created_at: string;
  is_confirmed: boolean;
  tokens: number;
  destination: string;
  hops: string[];
};

export type ForwardType = {
  tokens: number;
  incoming_channel: string;
  outgoing_channel: string;
  created_at: string;
  fee: number;
};

export type GetWalletInfoType = {
  alias: string;
  public_key: string;
  version: string;
};

export type DiffieHellmanComputeSecretType = {
  secret: string;
};

export type GetNodeType = { alias: string; color: string };

export type UtxoType = any;

export type ChainTransaction = any;

export type ProbeForRouteType = { route?: { hops: [{ public_key: string }] } };

export type GetChannelType = {
  policies: {
    public_key: string;
    base_fee_mtokens: string;
    fee_rate: number;
  }[];
};

export type GetClosedChannelsType = { channels: ChannelType[] };

export type GetChannelsType = { channels: ChannelType[] };

export type GetForwardsType = { forwards: ForwardType[]; next?: string };

export type GetInvoicesType = { invoices: InvoiceType[]; next?: string };

export type GetPaymentsType = { payments: PaymentType[]; next?: string };

export type GetChainBalanceType = { chain_balance: number };

export type GetChannelBalanceType = {
  channel_balance: number;
  pending_balance: number;
};

export type GetPendingChainBalanceType = { pending_chain_balance: number };

export type GetChainTransactionsType = { transactions: ChainTransaction[] };

export type GetUtxosType = { utxos: UtxoType[] };

export type CreateChainAddressType = { address: string };

export type SendToChainAddressType = {
  id: string;
  confirmation_count: number;
  is_confirmed: boolean;
  is_outgoing: boolean;
  tokens: number | null;
};

export type PendingChannelType = {
  close_transaction_id: string;
  is_active: boolean;
  is_closing: boolean;
  is_opening: boolean;
  is_timelocked: boolean;
  local_balance: number;
  local_reserve: number;
  partner_public_key: string;
  received: number;
  remote_balance: number;
  remote_reserve: number;
  sent: number;
  transaction_fee: number;
  transaction_id: string;
  transaction_vout: number;
  timelock_blocks?: number;
  timelock_expiration?: number;
};

export type GetPendingChannelsType = { pending_channels: PendingChannelType[] };

export type BackupChannel = {
  transaction_id: string;
  transaction_vout: number;
};

export type Permissions = {
  is_ok_to_adjust_peers: boolean;
  is_ok_to_create_chain_addresses: boolean;
  is_ok_to_create_invoices: boolean;
  is_ok_to_create_macaroons: boolean;
  is_ok_to_derive_keys: boolean;
  is_ok_to_get_chain_transactions: boolean;
  is_ok_to_get_invoices: boolean;
  is_ok_to_get_wallet_info: boolean;
  is_ok_to_get_payments: boolean;
  is_ok_to_get_peers: boolean;
  is_ok_to_pay: boolean;
  is_ok_to_send_to_chain_addresses: boolean;
  is_ok_to_sign_bytes: boolean;
  is_ok_to_sign_messages: boolean;
  is_ok_to_stop_daemon: boolean;
  is_ok_to_verify_bytes_signatures: boolean;
  is_ok_to_verify_messages: boolean;
};

export type VerifyMessage = {
  signed_by: string;
};

export type SignMessage = {
  signature: string;
};

export type GrantAccess = { macaroon: string; permissions: string[] };

export type NetworkInfo = {
  average_channel_size: number;
  channel_count: number;
  max_channel_size: number;
  median_channel_size: number;
  min_channel_size: number;
  node_count: number;
  not_recently_updated_policy_count: number;
  total_capacity: number;
};

export type Peer = {
  bytes_received: number;
  bytes_sent: number;
  is_inbound: boolean;
  is_sync_peer: boolean;
  ping_time: number;
  public_key: string;
  socket: string;
  tokens_received: number;
  tokens_sent: number;
};

export type GetPeers = { peers: Peer[] };

export type SendToChainParams = {
  address: string;
  fee_tokens_per_vbyte?: number;
  is_send_all?: boolean;
  target_confirmations?: number;
  tokens?: number;
};
