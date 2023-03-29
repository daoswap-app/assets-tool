import { defineStore } from "pinia";
import { store } from "@/store";
import { storageLocal } from "@pureadmin/utils";

type WalletType = {
  wallet: string;
};

const defaultWalletStorageId = "defaultWallet";

const useWalletStore = defineStore({
  id: "pure-wallet",
  state: (): WalletType => ({
    wallet: storageLocal().getItem<string>(defaultWalletStorageId) ?? ""
  }),
  getters: {
    getWallet() {
      return this.wallet;
    }
  },
  actions: {
    setDefaultWallet(wallet: string) {
      storageLocal().setItem(defaultWalletStorageId, wallet);
      this.wallet = wallet;
    }
  }
});

export function useWalletStoreHook() {
  return useWalletStore(store);
}
