import { ProviderLabel } from "@web3-onboard/injected-wallets";

export const WalletNames = {
  METAMASK: ProviderLabel.MetaMask,
  WALLET_CONNECT: "WalletConnect"
};

/* Check if the wallet is unlocked. */
export const isWalletUnlocked = async (
  walletName: string
): Promise<boolean> => {
  if (typeof window === "undefined") return false;

  // Only MetaMask exposes a method to check if the wallet is unlocked
  if (walletName === WalletNames.METAMASK) {
    return window.ethereum?._metamask?.isUnlocked?.() || false;
  }

  // Wallet connect creates a localStorage entry when connected and removes it when disconnected
  if (walletName === WalletNames.WALLET_CONNECT) {
    return window.localStorage.getItem("walletconnect") !== null;
  }

  return false;
};
