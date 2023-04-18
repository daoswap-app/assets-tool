<script setup lang="ts">
import { ref, onMounted } from "vue";
import { transformI18n } from "@/plugins/i18n";
import { type ConnectedWalletType } from "@/store/modules/web3Modal";
import MultiSigWallet_ABI from "@/assets/abi/MultiSigWallet_abi.json";
import { getContractByABI, weiToEther } from "@/utils/web3";

defineOptions({
  name: "TransactionsHistory"
});

const props = defineProps({
  connectedWallet: {
    type: Object as PropType<ConnectedWalletType>,
    default: null
  },
  web3: {
    type: Object as PropType<any>,
    default: null
  },
  currentWallet: {
    type: String,
    default: ""
  }
});

// 变量
const loading = ref<boolean>(false);
const tableDataHistory = ref([]);
// 方法
const getTransactionList = async () => {
  loading.value = true;
  // 调用合约
  const contract = getContractByABI(
    MultiSigWallet_ABI,
    props.currentWallet,
    props.web3
  );
  // 获取交易记录，已执行交易
  const transactionApprovedIds = await contract.methods
    .getTransactionIds(1)
    .call();
  const getResultForApproved = transactionApprovedIds.map(
    async (id: string) => {
      const transaction = await contract.methods.getTransaction(id).call();
      const transactionConfirmationStatus = await contract.methods
        .getTransactionConfirmationStatus(id, props.connectedWallet.address)
        .call();
      const tempItem = {
        id: id,
        destination: transaction.to,
        value: weiToEther(transaction.value, props.web3),
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
  if (props.connectedWallet && props.web3 && props.currentWallet) {
    getTransactionList();
  }
});
</script>

<template>
  <div>
    <el-table :data="tableDataHistory" style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="所属店铺">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="商品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="商品分类">
              <span>{{ props.row.category }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="商品描述">
              <span>{{ props.row.desc }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column :label="transformI18n('transaction.destination')">
        <template v-slot="scope">
          <div style="display: flex; align-items: left">
            <i class="el-icon-time" />
            <span style="margin-left: 10px">{{ scope.row.destination }}</span>
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
  </div>
</template>

<style>
.demo-table-expand {
  font-size: 0;
}

.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}

.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>
