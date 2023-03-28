import { chains } from "@/config/chains";
import { en } from "../../locales/web3-onboard/en";
import { zh } from "../../locales/web3-onboard/zh";
import Onboard, {
  type EIP1193Provider,
  type OnboardAPI
} from "@web3-onboard/core";
import injectedModule from "@web3-onboard/injected-wallets";

const injected = injectedModule();

export type ConnectedWallet = {
  label: string;
  chainId: string;
  address: string;
  ens?: string;
  provider: EIP1193Provider;
};

let onboard: OnboardAPI | null = null;

/** 实例化钱包 */
export const createOnboard = (): OnboardAPI => {
  if (onboard) return onboard;

  onboard = Onboard({
    wallets: [injected],
    chains: chains,
    appMetadata: {
      name: "AssetsTool",
      icon: "/images/safe-logo-green.png",
      description: "Daoswap Wallet APP",
      // gettingStartedGuide: "",
      recommendedInjectedWallets: [
        { name: "MetaMask", url: "https://metamask.io" }
      ]
    },
    connect: {
      showSidebar: true
      // autoConnectLastWallet: true
    },
    i18n: {
      en: en,
      zh: zh
    },
    theme: "system",
    accountCenter: {
      desktop: {
        enabled: false
      },
      mobile: {
        enabled: false
      }
    }
  });

  return onboard;
};
