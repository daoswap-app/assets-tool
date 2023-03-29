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

defineOptions({
  name: "Transactions"
});

// 变量
const loading = ref<boolean>(false);
const connectedWallet = ref<string | null>(null);
const currentWallet = ref<ConnectedWalletType>(null);
const web3 = ref<Web3Type | null>(null);
const tableDataQueue = ref([]);
const tableDataHistory = ref([]);
// 方法
const getTransactionList = async () => {
  loading.value = true;
  // 调用合约
  const contract = getContractByABI(
    MultiSigWallet_ABI,
    useWalletStoreHook().getWallet,
    web3.value
  );
  // 获取交易数量，未执行交易
  const transactionPendingCount = await contract.methods
    .getTransactionCount(0)
    .call();
  for (let i = 0; i < transactionPendingCount; i++) {
    const transaction = await contract.methods.getTransaction(i).call();
    const transactionConfirmationStatus = await contract.methods
      .getTransactionConfirmationStatus(i, currentWallet.value.address)
      .call();
    const tempItem = {
      id: i,
      destination: transaction.destination,
      value: weiToEther(transaction.value, web3.value),
      executeState: transaction.state,
      confirmStatus: transactionConfirmationStatus
    };
    tableDataQueue.value.push(tempItem);
  }
  // 获取交易数量，已执行交易
  const transactionApprovedCount = await contract.methods
    .getTransactionCount(1)
    .call();
  for (let i = 0; i < transactionApprovedCount; i++) {
    const transaction = await contract.methods.getTransaction(i).call();
    const transactionConfirmationStatus = await contract.methods
      .getTransactionConfirmationStatus(i, currentWallet.value.address)
      .call();
    const tempItem = {
      id: i,
      destination: transaction.destination,
      value: weiToEther(transaction.value, web3.value),
      executeState: transaction.state,
      confirmStatus: transactionConfirmationStatus
    };
    tableDataHistory.value.push(tempItem);
  }
};

onMounted(() => {
  connectedWallet.value = useWalletStoreHook().getWallet;
  currentWallet.value = useWeb3ModalStoreHook().getWallet;
  web3.value = useWeb3ModalStoreHook().getWeb3;
  getTransactionList();
});

const selected = ref("0");

function tabClick({ index }) {
  selected.value = index;
}
//确认交易
const handleConfirm = (value: any) => {
  loading.value = true;
  // 调用合约
  const contract = getContractByABI(
    MultiSigWallet_ABI,
    useWalletStoreHook().getWallet,
    web3.value
  );
  // 发送交易，BNB
  contract.methods
    .confirmTransaction(value.id)
    .send({
      from: currentWallet.value.address
    })
    .then((res: any) => {
      console.info(res);
    })
    .catch((e: any) => {
      console.error(e);
    })
    .finally(() => {
      loading.value = false;
    });
};
//选择交易
const handleExecute = (value: any) => {
  loading.value = true;
  // 调用合约
  const contract = getContractByABI(
    MultiSigWallet_ABI,
    useWalletStoreHook().getWallet,
    web3.value
  );
  // 发送交易，BNB
  contract.methods
    .executeTransaction(value.id)
    .send({
      from: currentWallet.value.address
    })
    .then((res: any) => {
      console.info(res);
    })
    .catch((e: any) => {
      console.error(e);
    })
    .finally(() => {
      loading.value = false;
    });
};
</script>

<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">{{
            transformI18n("transaction.transactions")
          }}</span>
        </div>
      </template>

      <el-tabs v-model="selected" @tab-click="tabClick">
        <el-tab-pane :label="transformI18n('transaction.queue')" name="0">
          <el-table :data="tableDataQueue" style="width: 100%">
            <el-table-column :label="transformI18n('transaction.destination')">
              <template v-slot="scope">
                <div style="display: flex; align-items: left">
                  <i class="el-icon-time" />
                  <span style="margin-left: 10px">{{
                    scope.row.destination
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="transformI18n('transaction.value')">
              <template v-slot="scope">
                <div style="display: flex; align-items: left">
                  <span>{{ scope.row.value }}</span>
                  <span style="margin-left: 3px">{{ scope.row.symbol }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="transformI18n('assets.operation')">
              <template v-slot="scope">
                <el-button
                  v-if="!scope.row.confirmStatus"
                  type="primary"
                  size="small"
                  @click="handleConfirm(scope.row)"
                >
                  {{ transformI18n("transaction.btnConfirm") }}
                </el-button>
                <!-- v-if="scope.row.executeState === 0" -->
                <el-button
                  type="primary"
                  size="small"
                  @click="handleExecute(scope.row)"
                >
                  {{ transformI18n("transaction.btnExecute") }}
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="transformI18n('transaction.history')" name="1">
          <el-table :data="tableDataHistory" style="width: 100%">
            <el-table-column :label="transformI18n('transaction.destination')">
              <template v-slot="scope">
                <div style="display: flex; align-items: left">
                  <i class="el-icon-time" />
                  <span style="margin-left: 10px">{{
                    scope.row.destination
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="transformI18n('transaction.value')">
              <template v-slot="scope">
                <div style="display: flex; align-items: left">
                  <span>{{ scope.row.value }}</span>
                  <span style="margin-left: 3px">{{ scope.row.symbol }}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
