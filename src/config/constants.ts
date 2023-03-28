import { chainIds } from "./chains";

// Wallet Contract Address
export const WALLET_CONTRACT_ADDRESSES: { [chainId: string]: string } = {
  [chainIds.localhost]: "0x31B48B6484c7D93f43a3838652A86b18740E37C6",
  [chainIds.bnbt]: "0x28A98E363D777c943EBA7bBc384046332643f908"
};

export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
export const EMPTY_DATA = "0x";

// TODO：类型，后期要移走
export type WalletItem = {
  name: string;
  token: string;
  ownerCount: number;
  threshold: number;
  owners: string[];
};
