import { chainIds } from "./chains";

// Wallet Contract Address
export const WALLET_CONTRACT_ADDRESSES: { [chainId: string]: string } = {
  [chainIds.localhost]: "0x8FfA6eC4cDFb3210C141C0b44Fc825521e4289FB",
  [chainIds.bnbt]: "0x1B08d2E45219c57dce50410bd73880AcFD2bEe36",
  [chainIds.bnb]: "0x7e932EA8c579Af1F16cC6BC09a3d85a103752D31"
};
export const EventFromBlock: { [chainId: string]: number } = {
  [chainIds.localhost]: 13,
  [chainIds.bnbt]: 29090975,
  [chainIds.bnb]: 30607373
};
export const EventMaxQueryNumber = 5000;

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
