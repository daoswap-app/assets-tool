import { chainIds } from "./chains";

// Wallet Contract Address
export const WALLET_CONTRACT_ADDRESSES: { [chainId: string]: string } = {
  [chainIds.localhost]: "0x31B48B6484c7D93f43a3838652A86b18740E37C6",
  [chainIds.bnbt]: "0x4aAbdf530E73C2D8dc753e683FD02e62e6D26579"
};
export const EventFromBlock: { [chainId: string]: number } = {
  [chainIds.localhost]: 402,
  [chainIds.bnbt]: 28951230
};

// token list
export const TOKEN_LIST: { [chainId: string]: string[] } = {
  [chainIds.localhost]: [],
  [chainIds.bnbt]: [
    // "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
    "0xdb5D970F03bfD19c1E51D57BcEd114BC35A0808f"
  ]
};

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const EMPTY_DATA = "0x";
export const SENTINEL_OWNERS_ADDRESS =
  "0x0000000000000000000000000000000000000001";

// TODO：类型，后期要移走
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
