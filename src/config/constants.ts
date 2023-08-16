import { chainIds } from "./chains";

// Wallet Contract Address
export const WALLET_CONTRACT_ADDRESSES: { [chainId: string]: string } = {
  [chainIds.localhost]: "0xb6B4C9efcAbAd3cc2E88980AF20C9b312F431e1D",
  [chainIds.bnbt]: "0x612B8b31552812b399e95f2e771d7182Aa418805", // "0x4D19c3e67D83CA0D50CeeA99dDd4f86C7990c960", // "0x1B08d2E45219c57dce50410bd73880AcFD2bEe36",
  [chainIds.bnb]: "0xd02550A70a1628E44ea83214B1e60Fe7C4eE5b44" //"0x7e932EA8c579Af1F16cC6BC09a3d85a103752D31"
};
export const EventFromBlock: { [chainId: string]: number } = {
  [chainIds.localhost]: 59,
  [chainIds.bnbt]: 32490068, // 29090975,
  [chainIds.bnb]: 30607373
};
export const EventMaxQueryNumber = 10000;

// token list
export const TOKEN_LIST: { [chainId: string]: TokenListType[] } = {
  [chainIds.localhost]: [],
  [chainIds.bnbt]: [
    {
      token: "0xdb5D970F03bfD19c1E51D57BcEd114BC35A0808f",
      symbol: "DAO"
    }
  ],
  [chainIds.bnb]: [
    {
      token: "0xc096332CAacF00319703558988aD03eC6586e704",
      symbol: "DAO"
    }
  ]
};

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const EMPTY_DATA = "0x";
export const SENTINEL_OWNERS_ADDRESS =
  "0x0000000000000000000000000000000000000001";

export const TransactionType = {
  ["TransactionCreated"]: {
    name: "TransactionCreated",
    tagType: "warning"
  },
  ["TransactionConfirmed"]: {
    name: "TransactionConfirmed",
    tagType: "success"
  },
  ["TransactionRevoke"]: {
    name: "TransactionRevoke",
    tagType: "danger"
  },
  ["TransactionExecuted"]: {
    name: "TransactionExecuted",
    tagType: ""
  }
};

// TODO：类型，后期要移走
// Exported Types
type ConnectionInfo = {
  url: string;
  headers?: { [key: string]: string | number };

  user?: string;
  password?: string;

  allowInsecureAuthentication?: boolean;
  allowGzip?: boolean;

  throttleLimit?: number;
  throttleSlotInterval?: number;
  throttleCallback?: (attempt: number, url: string) => Promise<boolean>;

  timeout?: number;
};
export interface Chain {
  namespace?: "evm";
  id: string;
  chainId: number;
  rpcUrl: string;
  label: string;
  token: string;
  color?: string;
  icon?: string;
  providerConnectionInfo?: ConnectionInfo;
  publicRpcUrl?: string;
  blockExplorerUrl?: string;
}
export type ChainWithDecimalId = Omit<Chain, "id"> & {
  id: number;
};

export type TokenListType = {
  token: string;
  symbol: string;
};
export type WalletItem = {
  name: string;
  token: string;
  ownerCount: number;
  threshold: number;
  owners: string[];
};
export type AssetItem = {
  symbol: string;
  token: string;
  balance: string;
};
