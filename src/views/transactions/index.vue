<script setup lang="ts">
import { ref, onMounted } from "vue";
import { transformI18n } from "@/plugins/i18n";
import { useWalletStoreHook } from "@/store/modules/wallet";
import {
  useWeb3ModalStoreHook,
  type Web3Type,
  type ConnectedWalletType
} from "@/store/modules/web3Modal";
import Wallet_ABI from "@/assets/abi/Wallet_abi.json";
import { WALLET_CONTRACT_ADDRESSES } from "@/config/constants";
import { getContractByABI } from "@/utils/web3";

import Queue from "./components/Queue.vue";
import History from "./components/History.vue";
import ButtonOfCopy from "@/components/common/ButtonOfCopy.vue";

defineOptions({
  name: "Transactions"
});

// 变量
const currentWallet = ref<string | null>(null);
const connectedWallet = ref<ConnectedWalletType>(null);
const web3 = ref<Web3Type | null>(null);

async function init() {
  currentWallet.value = useWalletStoreHook().getWallet;
  connectedWallet.value = useWeb3ModalStoreHook().getWallet;
  web3.value = useWeb3ModalStoreHook().getWeb3;

  try {
    // 查询钱包列表
    const contractWallet = getContractByABI(
      Wallet_ABI,
      WALLET_CONTRACT_ADDRESSES[connectedWallet.value.chainId],
      web3.value
    );
    const myWalletList = await contractWallet.methods.getWalletList().call({
      from: connectedWallet.value.address
    });
    if (myWalletList.length > 0) {
      if (!currentWallet.value) {
        useWalletStoreHook().setDefaultWallet(myWalletList[0].token);
        currentWallet.value = myWalletList[0].token;
      }
    } else {
      useWalletStoreHook().removeDefaultWallet();
      currentWallet.value = null;
    }
  } catch (e) {
    console.log(e);
  }
}

onMounted(() => {
  init();
});

const selected = ref("0");
const timestamp = ref<number>(0);

function tabClick({ index }) {
  selected.value = index;
  timestamp.value = Date.parse(new Date().toString());
}

// 监听钱包
useWeb3ModalStoreHook().$subscribe(() => {
  init();
});
</script>

<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium" style="word-wrap: break-word">
            {{ transformI18n("transaction.transactions") }} -
            <ButtonOfCopy :text="currentWallet" />
          </span>
        </div>
      </template>

      <el-tabs v-if="currentWallet" v-model="selected" @tab-click="tabClick">
        <el-tab-pane :label="transformI18n('transaction.queue')" name="0">
          <Queue
            v-if="connectedWallet && web3 && currentWallet"
            :connectedWallet="connectedWallet"
            :web3="web3"
            :currentWallet="currentWallet"
            :key="timestamp"
          />
        </el-tab-pane>
        <el-tab-pane :label="transformI18n('transaction.history')" name="1">
          <History
            v-if="connectedWallet && web3 && currentWallet"
            :connectedWallet="connectedWallet"
            :web3="web3"
            :currentWallet="currentWallet"
            :key="timestamp"
          />
        </el-tab-pane>
      </el-tabs>
      <el-empty v-else :description="transformI18n('transaction.noData')" />
    </el-card>
  </div>
</template>
