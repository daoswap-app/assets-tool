<script setup lang="ts">
import { ref, onMounted } from "vue";
import { transformI18n } from "@/plugins/i18n";
import { type ConnectedWalletType } from "@/store/modules/web3Modal";
import MultiSigWallet_ABI from "@/assets/abi/MultiSigWallet_abi.json";
import { TransactionType } from "@/config/constants";
import { getContractByABI } from "@/utils/web3";
import { compare } from "@/utils/array";
import ButtonOfCopy from "@/components/common/ButtonOfCopy.vue";
import { getChainInfoByChainId } from "@/config/chains";
import {
  decodeParamsForTransfer,
  decodeParamsForOperation
} from "../utils/decodeParams";
import { getEventsList } from "../utils/getLogs";

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
const chainInfo = ref(null);

// 方法
const getTransactionList = async () => {
  loading.value = true;
  // 调用合约
  const contract = getContractByABI(
    MultiSigWallet_ABI,
    props.currentWallet,
    props.web3
  );

  // 重置数据
  tableDataHistory.value = [];
  // 获取交易记录，已执行交易
  const transactionApprovedIds = await contract.methods
    .getTransactionIds(1)
    .call();
  const transactionRevokeIds = await contract.methods
    .getTransactionIds(2)
    .call();
  const transactionIds = transactionApprovedIds.concat(transactionRevokeIds);
  const getResults = transactionIds.map(async (id: string) => {
    const transaction = await contract.methods.getTransaction(id).call();
    const transactionConfirmationStatus = await contract.methods
      .getTransactionConfirmationStatus(id, props.connectedWallet.address)
      .call();
    // 当前chain信息
    const chainId = await props.web3.eth.getChainId();
    chainInfo.value = getChainInfoByChainId(chainId);
    // 获取日志记录
    const filter = {
      transactionId: id
    };
    const allEvents = await getEventsList(
      contract,
      chainId,
      props.web3,
      filter
    );
    // 组装单笔交易的数据
    const defaultItemData = {
      id: id,
      destination: transaction.to,
      tokenSymbol: "",
      value: null,
      data: null,
      confirmations: transaction.confirmations,
      revokes: transaction.revokes,
      executeState: transaction.state,
      confirmStatus: transactionConfirmationStatus,
      type: 1, // 处理交易数据，1-转账，2-操作
      methodName: "",
      events: allEvents // []
    };
    let returnData = null;
    // 目标地址等于钱包地址为操作，其它为转账
    if (transaction.to.toLowerCase() === props.currentWallet.toLowerCase()) {
      returnData = decodeParamsForOperation(transaction);
    } else {
      returnData = decodeParamsForTransfer(transaction, chainInfo, props.web3);
    }
    // 合并数据
    const tempItem = { ...defaultItemData, ...returnData };

    tableDataHistory.value.push(tempItem);
  });
  await Promise.all(getResults);
  tableDataHistory.value.sort(compare("id"));

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
    <el-table v-loading="loading" :data="tableDataHistory" style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="scope">
          <p style="word-wrap: break-word">
            {{ transformI18n("transaction.destination") }}:
            <ButtonOfCopy :text="scope.row.destination" />
          </p>
          <div v-if="scope.row.type == 2">
            <p
              style="word-wrap: break-word"
              v-for="(dataInfo, index) in scope.row.data"
              :key="index"
            >
              {{ transformI18n("transaction." + dataInfo.name) }}:
              {{ dataInfo.value }}
            </p>
          </div>
          <div v-if="scope.row.type == 1">
            <p style="word-wrap: break-word">
              {{ transformI18n("transaction.amount") }}: {{ scope.row.value }}
              {{ scope.row.tokenSymbol }}
            </p>
          </div>
          <el-divider />
          <div class="block">
            <el-timeline v-if="scope.row.events.length > 0">
              <el-timeline-item
                v-for="(event, index) in scope.row.events"
                :key="index"
                :timestamp="event.createTime"
                placement="top"
              >
                <el-card>
                  <h4>
                    {{ transformI18n("transaction.eventName") }}:
                    <el-tag :type="TransactionType[event.eventName].tagType">
                      {{
                        TransactionType[event.eventName].name
                          ? transformI18n(
                              "transaction." +
                                TransactionType[event.eventName].name
                            )
                          : ""
                      }}
                    </el-tag>
                  </h4>
                  <p style="word-wrap: break-word">
                    {{ transformI18n("transaction.eventFrom") }}:
                    <span>{{ event.from }}</span>
                  </p>
                  <p style="word-wrap: break-word">
                    {{ transformI18n("transaction.eventTransactionHash") }}:
                    <span>{{ event.transactionHash }}</span>
                  </p>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="transformI18n('transaction.type')">
        <template v-slot="scope">
          <div style="display: flex; align-items: left">
            <el-tag v-if="scope.row.type == 1" type="success">
              {{ transformI18n("transaction." + scope.row.methodName) }}
            </el-tag>
            <el-tag v-if="scope.row.type == 2" type="warning">
              {{ transformI18n("transaction." + scope.row.methodName) }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="transformI18n('transaction.value')">
        <template v-slot="scope">
          <div style="display: flex; align-items: left">
            <span>{{ scope.row.value }}</span>
            <span style="margin-left: 3px">{{ scope.row.tokenSymbol }}</span>
          </div>
        </template>
      </el-table-column> -->
      <el-table-column :label="transformI18n('transaction.status')">
        <template v-slot="scope">
          <div style="display: flex; align-items: left">
            <el-tag v-if="scope.row.executeState == 1" type="success">
              {{ transformI18n("transaction.statusSuccess") }}
            </el-tag>
            <el-tag v-if="scope.row.executeState == 2" type="danger">
              {{ transformI18n("transaction.statusRevoke") }}
            </el-tag>
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
