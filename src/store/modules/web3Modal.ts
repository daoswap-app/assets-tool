import Web3 from "web3";
import Web3Modal from "web3modal";
import { provider } from "web3-core";
import { defineStore } from "pinia";
import { store } from "@/store";
import { getChainInfoByChainId } from "@/config/chains";
import { useUserStoreHook } from "@/store/modules/user";

export type Web3Type = Web3;

export type ConnectedWalletType = {
  label: string;
  chainId: string;
  address: string;
  ens?: string;
  provider: provider;
  isSupport: boolean;
};

type Web3ModalType = {
  web3: Web3Type | null;
  connectedWallet: ConnectedWalletType | null;
};

const useWeb3ModalStore = defineStore({
  id: "pure-web3Modal",
  state: (): Web3ModalType => ({
    web3: null,
    connectedWallet: null
  }),
  getters: {
    getWeb3() {
      return this.web3;
    },
    getWallet() {
      return this.connectedWallet;
    },
    getWalletAddress() {
      return this.connectedWallet?.address;
    }
  },
  actions: {
    // 监听钱包事件 OK
    async subscribeProvider(provider) {
      if (!provider.on) {
        return;
      }
      provider.on("connect", () => {
        this.getConnectedWallet();
      });
      provider.on("disconnect", () => {
        useUserStoreHook().logOut();
      });
      provider.on("accountsChanged", async (accounts: any) => {
        if (accounts.length > 0) {
          this.getConnectedWallet();
        } else {
          useUserStoreHook().logOut();
        }
      });
      provider.on("chainChanged", async () => {
        // const chainIdNumber = Web3.utils.hexToNumber(chainId);
        this.getConnectedWallet();
      });
    },
    async initWeb3Modal() {
      const providerOptions = {
        /* See Provider Options Section */
      };

      const web3Modal = new Web3Modal({
        network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions // required
      });

      const provider = await web3Modal.connect();
      // 添加监听
      this.subscribeProvider(provider);
      const web3 = new Web3(provider);
      return web3;
    },
    // 初始化钱包连接
    async init() {
      await this.initWeb3();
      await this.getConnectedWallet(this.web3);
    },
    /** 初始化实例 */
    async initWeb3() {
      if (!this.web3) {
        try {
          this.web3 = await this.initWeb3Modal();
        } catch (error) {
          console.error(error);
        }
      }
      return this.web3;
    },
    async getConnectedWallet(web3?: Web3) {
      if (!web3) {
        web3 = this.web3;
      }
      if (!this.web3) {
        return null;
      }

      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
      if (!account) return null;

      const chainId = await web3.eth.getChainId();
      const chainInfo = getChainInfoByChainId(chainId);

      this.connectedWallet = {
        label: web3.eth.ens.registryAddress,
        chainId: chainId,
        address: Web3.utils.toChecksumAddress(account),
        ens: web3.eth.ens.registryAddress,
        provider: web3.eth.currentProvider,
        isSupport: chainInfo ? true : false
      };
      return this.connectedWallet;
    },
    /** 断开连接 */
    async disconnectWallet() {
      // if (this.web3 && this.web3.currentProvider) {
      //   await this.web3.setProvider(null);
      // }
    }
  }
});

export function useWeb3ModalStoreHook() {
  return useWeb3ModalStore(store);
}
