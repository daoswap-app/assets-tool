import { chainIds } from "./chains";

// Wallet Contract Address
export const WALLET_CONTRACT_ADDRESSES: { [chainId: string]: string } = {
  [chainIds.localhost]: "0x31B48B6484c7D93f43a3838652A86b18740E37C6",
  [chainIds.bnbt]: "0x1B08d2E45219c57dce50410bd73880AcFD2bEe36"
};
export const EventFromBlock: { [chainId: string]: number } = {
  [chainIds.localhost]: 402,
  [chainIds.bnbt]: 29090975
};
export const EventMaxQueryNumber = 5000;

// token list
export const TOKEN_LIST: { [chainId: string]: TokenListType[] } = {
  [chainIds.localhost]: [],
  [chainIds.bnbt]: [
    // "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    {
      token: "0xdb5D970F03bfD19c1E51D57BcEd114BC35A0808f",
      symbol: "DAO"
    }
  ]
};

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const EMPTY_DATA = "0x";
export const SENTINEL_OWNERS_ADDRESS =
  "0x0000000000000000000000000000000000000001";

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
