<script setup lang="ts">
import { ref, onMounted, PropType } from "vue";
import { transformI18n } from "@/plugins/i18n";
import { type ConnectedWalletType } from "@/store/modules/web3Modal";
import MultiSigWallet_ABI from "@/assets/abi/MultiSigWallet_abi.json";
import { getContractByABI, weiToEther } from "@/utils/web3";
import { EventFromBlock } from "@/config/constants";
import { compare } from "@/utils/array";

defineOptions({
  name: "TransactionsQueue"
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
const tableDataQueue = ref([]);

const fromBlock = ref<number>(0); // EventFromBlock[chainId.value];
const block = ref<number>(0); // await library.value.eth.getBlock("latest");
const blockMod = ref<number>(0); // Math.ceil(diffBlock / 5000);

const eventList = ref([]);

// 方法
const getTransactionList = async () => {
  loading.value = true;
  // 调用合约
  const contract = getContractByABI(
    MultiSigWallet_ABI,
    props.currentWallet,
    props.web3
  );
  // 获取交易记录，未执行交易
  const transactionPendingIds = await contract.methods
    .getTransactionIds(0)
    .call();
  const getResultForPending = transactionPendingIds.map(async (id: string) => {
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
    tableDataQueue.value.push(tempItem);
  });
  await Promise.all(getResultForPending);
  loading.value = false;
};
const getEventList = async () => {
  loading.value = true;
  // 获取block数据
  fromBlock.value = EventFromBlock[props.connectedWallet.chainId];
  block.value = await props.web3.eth.getBlock("latest");
  blockMod.value = Math.ceil((block.value.number - fromBlock.value) / 5000);

  eventList.value = [];
  // 调用合约
  const contract = getContractByABI(
    MultiSigWallet_ABI,
    props.currentWallet,
    props.web3
  );
  const eventsWalletCreated = await contract.getPastEvents("allEvents");
  console.info(eventsWalletCreated);
  console.info("-------------");
  // 获取交易Ids
  const transactionPendingIds = await contract.methods
    .getTransactionIds(0)
    .call();
  // 查询交易详情
  const getResultForPending = transactionPendingIds.map(async (id: string) => {
    const transaction = await contract.methods.getTransaction(id).call();
    const transactionConfirmationStatus = await contract.methods
      .getTransactionConfirmationStatus(id, props.connectedWallet.address)
      .call();
    const tempItem = {
      id: id,
      destination: transaction.to,
      value: weiToEther(transaction.value, props.web3),
      executeState: transaction.state,
      confirmStatus: transactionConfirmationStatus,
      events: []
    };
    // 查询日志信息
    let haveEvent = true;
    for (let index = 0; index < blockMod.value; index++) {
      if (haveEvent) {
        const currentFromBlock = fromBlock.value + 5000 * index;
        const toBlock = currentFromBlock + 4999;
        const events = await contract.getPastEvents("allEvents", {
          // TransactionCreated, allEvents
          filter: {
            transactionId: id
          },
          fromBlock: currentFromBlock,
          toBlock: toBlock
        });
        // console.info(events);
        const eventsCreated = await contract.getPastEvents(
          "TransactionCreated",
          {
            // TransactionCreated, allEvents
            filter: {
              transactionId: id
            }
          }
        );
        console.info(eventsCreated);
        console.info("-------------");
        const eventsConfirmed = await contract.getPastEvents(
          "TransactionConfirmed",
          {
            // TransactionCreated, allEvents
            filter: {
              transactionId: id
            }
          }
        );
        console.info(eventsConfirmed);
        console.info("-------------");
        if (events.length > 0) {
          const getResultForEvent = events.map(async (event: any) => {
            const txDetail = await props.web3.eth.getTransaction(
              event.transactionHash
            );
            const txBlock = await props.web3.eth.getBlock(event.blockNumber);
            const eventItem = {
              txDetail,
              txBlock
            };
            // console.info(txBlock);
            // const eventItem = {
            //   ...event.returnValues,
            //   ...{
            //     blockHash: event.blockHash,
            //     blockNumber: event.blockNumber
            //   }
            // };
            // eventList.value.push(tempItem);
            tempItem.events.push(eventItem);
          });
          await Promise.all(getResultForEvent);
          tempItem.events.sort(compare("blockNumber"));
        }
        if (events.length < toBlock) {
          haveEvent = false;
        }
      } else {
        break;
      }
    }
    console.info("=======================");

    tableDataQueue.value.push(tempItem);
  });
  await Promise.all(getResultForPending);

  loading.value = false;
};

onMounted(() => {
  if (props.connectedWallet && props.web3 && props.currentWallet) {
    // getTransactionList();
    getEventList();
  }
});

// 确认交易
const handleConfirm = (value: any) => {
  loading.value = true;
  // 调用合约
  const contract = getContractByABI(
    MultiSigWallet_ABI,
    props.currentWallet,
    props.web3
  );
  // 发送交易，BNB
  contract.methods
    .confirmTransaction(value.id)
    .send({
      from: props.connectedWallet.address
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
// 执行交易
const handleExecute = (value: any) => {
  loading.value = true;
  // 调用合约
  const contract = getContractByABI(
    MultiSigWallet_ABI,
    props.currentWallet,
    props.web3
  );
  // 发送交易，BNB
  contract.methods
    .executeTransaction(value.id)
    .send({
      from: props.connectedWallet.address
    })
    .then(() => {
      getTransactionList();
    })
    .catch((e: any) => {
      console.error(e);
    })
    .finally(() => {
      loading.value = false;
    });
};
// 驳回交易
const handleRevoke = (value: any) => {
  loading.value = true;
  // 调用合约
  const contract = getContractByABI(
    MultiSigWallet_ABI,
    props.currentWallet,
    props.web3
  );
  // 发送交易，BNB
  contract.methods
    .revokeTransaction(value.id)
    .send({
      from: props.connectedWallet.address
    })
    .then(() => {
      getTransactionList();
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
    <el-table :data="tableDataQueue" style="width: 100%">
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
          <el-button
            type="primary"
            size="small"
            @click="handleExecute(scope.row)"
          >
            {{ transformI18n("transaction.btnExecute") }}
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="handleRevoke(scope.row)"
          >
            {{ transformI18n("transaction.btnRevoke") }}
          </el-button>
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
