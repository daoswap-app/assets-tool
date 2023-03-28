import { defineStore } from "pinia";
import { store } from "@/store";
import { storageLocal } from "@pureadmin/utils";
import { checksumAddress } from "@/utils/addresses";
import {
  type EIP1193Provider,
  type WalletState,
  type OnboardAPI
} from "@web3-onboard/core";
import { isWalletUnlocked, WalletNames } from "@/config/wallets";
import { createOnboard } from "@/api/onboard";

export type ConnectedWalletType = {
  label: string;
  chainId: string;
  address: string;
  ens?: string;
  provider: EIP1193Provider;
};

type OnboardType = {
  onboard: OnboardAPI | null;
  isConnecting: boolean;
  connectedWallet: ConnectedWalletType | null;
};

const lastWalletStorageId = "lastWallet";

const useOnboardStore = defineStore({
  id: "pure-onboard",
  state: (): OnboardType => ({
    onboard: null,
    isConnecting: false,
    connectedWallet: null
  }),
  getters: {
    getOnboard() {
      return this.onboard;
    },
    getWallet() {
      return this.connectedWallet;
    }
  },
  actions: {
    /** 初始化实例 */
    init() {
      this.initOnboard();
      // 如果有最后连接钱包信息，自动连接钱包
      if (this.onboard && this.onboard.state.get().wallets.length === 0) {
        const label = storageLocal().getItem<string>(lastWalletStorageId);
        if (!label) return;

        isWalletUnlocked(label).then(isUnlocked => {
          isUnlocked &&
            this.connectWallet({
              autoSelect: { label, disableModals: true }
            });
        });
      }
    },
    /** 初始化钱包 */
    async initOnboard() {
      if (!this.onboard) {
        const onboard = createOnboard();
        this.onboard = onboard;
      }
    },
    /** 连接钱包 */
    async connectWallet(options?: Parameters<OnboardAPI["connectWallet"]>[0]) {
      if (!this.onboard) {
        this.initOnboard();
      }
      if (this.isConnecting) {
        return;
      }
      this.isConnecting = true;

      if (!options) {
        options = {
          autoSelect: WalletNames.METAMASK
        };
      }

      try {
        await this.onboard.connectWallet(options);
      } catch (e) {
        console.info(e);
        this.isConnecting = false;
        return;
      }
      const newWallet = await this.getConnectedWallet(
        this.onboard.state.get().wallets
      );
      if (newWallet) {
        storageLocal().setItem(lastWalletStorageId, newWallet.label);
      }
      this.isConnecting = false;
    },
    async getConnectedWallet(wallets: WalletState[]) {
      if (!wallets) return null;

      const primaryWallet = wallets[0];
      if (!primaryWallet) return null;

      const account = primaryWallet?.accounts[0];
      if (!account) return null;

      this.connectedWallet = {
        label: primaryWallet.label,
        address: checksumAddress(account.address),
        ens: account.ens?.name,
        chainId: Number(primaryWallet.chains[0].id).toString(10),
        provider: primaryWallet.provider
      };
      return this.connectedWallet;
    },
    /** 断开连接 */
    disconnectWallet() {
      if (this.connectedWallet) {
        this.onboard.disconnectWallet({ label: this.connectedWallet.label });
        this.onboard = null;
        this.connectedWallet = null;
        storageLocal().removeItem(lastWalletStorageId);
      }
    }
  }
});

export function useOnboardStoreHook() {
  return useOnboardStore(store);
}
