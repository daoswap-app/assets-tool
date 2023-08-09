import { markRaw } from "vue";
import { defineStore } from "pinia";
import { store } from "@/store";
import { getChainInfoByChainId, defaultRpcUrl } from "@/config/chains";
import { JsonRpcProvider } from "@ethersproject/providers";
import { useOnboardStoreHook, type ConnectedWalletType } from "./onboard";
import { WalletState } from "@web3-onboard/core";

type Web3Type = {
  web3ReadOnly: JsonRpcProvider | null;
};

const useWeb3Store = defineStore({
  id: "pure-web3",
  state: (): Web3Type => ({
    web3ReadOnly: null
  }),
  getters: {
    getWeb3() {
      return this.web3ReadOnly;
    },
    getSigner() {
      return this.web3ReadOnly.getSigner();
    }
  },
  actions: {
    /** 初始化实例 */
    init() {
      this.getCurrentWallet();
    },
    /** 创建Web3 */
    // TODO: 这里需要可以获取当前链信息，进行web3数据更新
    async createWeb3(currentWallet: ConnectedWalletType) {
      const walletProvider = currentWallet;
      if (!this.web3ReadOnly && walletProvider) {
        const chainInfo = getChainInfoByChainId(walletProvider.chainId);
        // if (chainInfo) {
        const web3 = new JsonRpcProvider({
          url: chainInfo ? chainInfo.rpcUrl : defaultRpcUrl,
          timeout: 10_000
        });
        this.web3ReadOnly = markRaw(web3);
        // }
      }
    },
    /** 获取当前钱包 */
    getCurrentWallet() {
      const onboard = useOnboardStoreHook().getOnboard;
      if (!onboard) return;

      const walletSubscription = onboard.state
        .select("wallets")
        .subscribe(async (wallets: WalletState[]) => {
          const newWallet = await useOnboardStoreHook().getConnectedWallet(
            wallets
          );
          this.createWeb3(newWallet);
        });

      return () => {
        walletSubscription.unsubscribe();
      };
    }
  }
});

export function useWeb3StoreHook() {
  return useWeb3Store(store);
}
