<script setup lang="ts">
import { ref, onMounted } from "vue";
import { transformI18n } from "@/plugins/i18n";
import { useWalletStoreHook } from "@/store/modules/wallet";
import {
  useWeb3ModalStoreHook,
  type Web3Type,
  type ConnectedWalletType
} from "@/store/modules/web3Modal";
import MultiSigWallet_ABI from "@/assets/abi/MultiSigWallet_abi.json";
import { getContractByABI, weiToEther } from "@/utils/web3";

import Queue from "./components/Queue.vue";
import History from "./components/History.vue";

defineOptions({
  name: "Transactions"
});

// 变量
const loading = ref<boolean>(false);
const currentWallet = ref<string | null>(null);
const connectedWallet = ref<ConnectedWalletType>(null);
const web3 = ref<Web3Type | null>(null);
const tableDataQueue = ref([]);
const tableDataHistory = ref([]);
// 方法
const getTransactionList = async () => {
  loading.value = true;
  // 调用合约
  const contract = getContractByABI(
    MultiSigWallet_ABI,
    currentWallet.value,
    web3.value
  );
  // 获取交易记录，未执行交易
  const transactionPendingIds = await contract.methods
    .getTransactionIds(0)
    .call();
  const getResultForPending = transactionPendingIds.map(async (id: string) => {
    const transaction = await contract.methods.getTransaction(id).call();
    const transactionConfirmationStatus = await contract.methods
      .getTransactionConfirmationStatus(id, connectedWallet.value.address)
      .call();
    const tempItem = {
      id: id,
      destination: transaction.to,
      value: weiToEther(transaction.value, web3.value),
      executeState: transaction.state,
      confirmStatus: transactionConfirmationStatus
    };
    tableDataQueue.value.push(tempItem);
  });
  await Promise.all(getResultForPending);
  // 获取交易记录，已执行交易
  const transactionApprovedIds = await contract.methods
    .getTransactionIds(1)
    .call();
  const getResultForApproved = transactionApprovedIds.map(
    async (id: string) => {
      const transaction = await contract.methods.getTransaction(id).call();
      const transactionConfirmationStatus = await contract.methods
        .getTransactionConfirmationStatus(id, connectedWallet.value.address)
        .call();
      const tempItem = {
        id: id,
        destination: transaction.to,
        value: weiToEther(transaction.value, web3.value),
        executeState: transaction.state,
        confirmStatus: transactionConfirmationStatus
      };
      tableDataHistory.value.push(tempItem);
    }
  );
  await Promise.all(getResultForApproved);
  loading.value = false;
};

onMounted(() => {
  currentWallet.value = useWalletStoreHook().getWallet;
  connectedWallet.value = useWeb3ModalStoreHook().getWallet;
  web3.value = useWeb3ModalStoreHook().getWeb3;
  getTransactionList();
});

const selected = ref("0");

function tabClick({ index }) {
  selected.value = index;
}
</script>

<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">{{
            transformI18n("transaction.transactions") + " - " + currentWallet
          }}</span>
        </div>
      </template>

      <el-tabs v-model="selected" @tab-click="tabClick">
        <el-tab-pane :label="transformI18n('transaction.queue')" name="0">
          <Queue
            v-if="connectedWallet && web3 && currentWallet"
            :connectedWallet="connectedWallet"
            :web3="web3"
            :currentWallet="currentWallet"
          />
        </el-tab-pane>
        <el-tab-pane :label="transformI18n('transaction.history')" name="1">
          <History
            v-if="connectedWallet && web3 && currentWallet"
            :connectedWallet="connectedWallet"
            :web3="web3"
            :currentWallet="currentWallet"
          />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
