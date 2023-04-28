<script setup lang="ts">
import { ref, onMounted, PropType } from "vue";
import { transformI18n } from "@/plugins/i18n";
import { type ConnectedWalletType } from "@/store/modules/web3Modal";
import ArrowDownSLine from "@iconify-icons/ri/arrow-down-s-line";
import MultiSigWallet_ABI from "@/assets/abi/MultiSigWallet_abi.json";
import ERC20_ABI from "@/assets/abi/ERC20_abi.json";
import {
  EventFromBlock,
  EventMaxQueryNumber,
  TOKEN_LIST,
  type TokenListType
} from "@/config/constants";
import { getContractByABI, weiToEther } from "@/utils/web3";
import { compare } from "@/utils/array";
import { parseTime } from "@/utils/date";
import { getChainInfo } from "@/config/chains";
import { hexValue } from "@ethersproject/bytes";

import InputDataDecoder from "ethereum-input-data-decoder";
const decoderForERC20 = new InputDataDecoder(ERC20_ABI);
const decoderForWallet = new InputDataDecoder(MultiSigWallet_ABI);

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
const chainInfo = ref(null);

const fromBlock = ref<number>(0); // EventFromBlock[chainId.value];
const block = ref<number>(0); // await library.value.eth.getBlock("latest");
const blockMod = ref<number>(0); // Math.ceil(diffBlock / 5000);

// 方法
const getTransactionList = async () => {
  loading.value = true;
  // 调用合约
  const contract = getContractByABI(
    MultiSigWallet_ABI,
    props.currentWallet,
    props.web3
  );
  // 获取block数据
  fromBlock.value = EventFromBlock[props.connectedWallet.chainId];
  block.value = await props.web3.eth.getBlockNumber();
  blockMod.value = Math.ceil(
    (block.value - fromBlock.value) / EventMaxQueryNumber
  );

  // 重置数据
  tableDataQueue.value = [];
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
    // 当前chain信息
    const chainId = await props.web3.eth.getChainId();
    chainInfo.value = getChainInfo(hexValue(parseInt(chainId)));
    // 处理交易数据，1-转账，2-操作
    let type = 1;
    let methodName = "";
    let tokenSymbol = "";
    let destination = transaction.to;
    let value = null;
    let data = null;
    // 目标地址等于钱包地址为操作，其它为转账
    if (transaction.to.toLowerCase() === props.currentWallet.toLowerCase()) {
      type = 2;
      const transactionData = transaction.data
        ? decoderForWallet.decodeData(transaction.data)
        : null;
      if (transactionData) {
        methodName = transactionData.method;
      }
    } else {
      type = 1;
      const transactionData = transaction.data
        ? decoderForERC20.decodeData(transaction.data)
        : null;
      tokenSymbol = chainInfo.value.token;
      value = weiToEther(transaction.value, props.web3);
      if (transactionData) {
        const tokenList = TOKEN_LIST[chainId].filter(
          (item: TokenListType) =>
            item.token.toLowerCase() === transaction.to.toLowerCase()
        );
        methodName = transactionData.method;
        tokenSymbol =
          tokenList.length > 0 ? tokenList[0].symbol : chainInfo.value.token;
        destination = transactionData.inputs[0];
        value = weiToEther(
          new props.web3.utils.toBN(transactionData.inputs[1].toString()),
          props.web3
        );
        data = {
          to: transactionData.inputs[0],
          value: weiToEther(
            new props.web3.utils.toBN(transactionData.inputs[1].toString()),
            props.web3
          )
        };
      }
    }

    const tempItem = {
      id: id,
      destination: destination,
      tokenSymbol: tokenSymbol,
      value: value,
      data: data,
      confirmations: transaction.confirmations,
      revokes: transaction.revokes,
      executeState: transaction.state,
      confirmStatus: transactionConfirmationStatus,
      type: type,
      methodName: methodName,
      events: []
    };
    // 查询日志信息
    for (let index = 0; index < blockMod.value; index++) {
      const currentFromBlock = fromBlock.value + EventMaxQueryNumber * index;
      const toBlock = currentFromBlock + (EventMaxQueryNumber - 1);
      const eventsOfTransactionCreated = await contract.getPastEvents(
        "TransactionCreated",
        {
          filter: {
            transactionId: id
          },
          fromBlock: currentFromBlock,
          toBlock: toBlock
        }
      );
      const eventsOfTransactionConfirmed = await contract.getPastEvents(
        "TransactionConfirmed",
        {
          filter: {
            transactionId: id
          },
          fromBlock: currentFromBlock,
          toBlock: toBlock
        }
      );
      const eventsOfTransactionRevoke = await contract.getPastEvents(
        "TransactionRevoke",
        {
          filter: {
            transactionId: id
          },
          fromBlock: currentFromBlock,
          toBlock: toBlock
        }
      );
      const events = eventsOfTransactionCreated.concat(
        eventsOfTransactionConfirmed,
        eventsOfTransactionRevoke
      );
      if (events.length > 0) {
        const getResultForEvent = events.map(async (event: any) => {
          const txDetail = await props.web3.eth.getTransaction(
            event.transactionHash
          );
          const eventItem = {
            eventName: event.event,
            ...event.returnValues,
            ...{
              transactionHash: event.transactionHash,
              blockNumber: event.blockNumber,
              from: txDetail.from,
              createTime: parseTime(event.returnValues.createTime)
            }
          };
          tempItem.events.push(eventItem);
        });
        await Promise.all(getResultForEvent);
        tempItem.events.sort(compare("blockNumber"));
      }
    }
    tableDataQueue.value.push(tempItem);
  });
  await Promise.all(getResultForPending);
  tableDataQueue.value.sort(compare("id"));

  loading.value = false;
};

onMounted(() => {
  if (props.connectedWallet && props.web3 && props.currentWallet) {
    getTransactionList();
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
    .then(async () => {
      await getTransactionList();
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
    .then(async () => {
      await getTransactionList();
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
    .then(async () => {
      await getTransactionList();
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
    <el-table v-loading="loading" :data="tableDataQueue" style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="scope">
          <p style="word-wrap: break-word">
            {{ transformI18n("transaction.destination") }}:
            {{ scope.row.destination }}
          </p>
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
                    <el-tag
                      v-if="event.eventName == 'TransactionCreated'"
                      type="warning"
                    >
                      {{
                        event.eventName
                          ? transformI18n("transaction." + event.eventName)
                          : ""
                      }}
                    </el-tag>
                    <el-tag
                      v-if="event.eventName == 'TransactionConfirmed'"
                      type="success"
                    >
                      {{
                        event.eventName
                          ? transformI18n("transaction." + event.eventName)
                          : ""
                      }}
                    </el-tag>
                    <el-tag
                      v-if="event.eventName == 'TransactionRevoke'"
                      type="danger"
                    >
                      {{
                        event.eventName
                          ? transformI18n("transaction." + event.eventName)
                          : ""
                      }}
                    </el-tag>
                    <el-tag v-if="event.eventName == 'TransactionExecuted'">
                      {{
                        event.eventName
                          ? transformI18n("transaction." + event.eventName)
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
      <el-table-column :label="transformI18n('transaction.value')">
        <template v-slot="scope">
          <div style="display: flex; align-items: left">
            <span>{{ scope.row.value }}</span>
            <span style="margin-left: 3px">{{ scope.row.tokenSymbol }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="transformI18n('assets.operation')">
        <template v-slot="scope">
          <el-dropdown trigger="click">
            <IconifyIconOffline :icon="ArrowDownSLine" class="text-[24px]" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item
                  v-if="!scope.row.confirmStatus"
                  @click="handleConfirm(scope.row)"
                >
                  {{ transformI18n("transaction.btnConfirm") }}
                </el-dropdown-item>
                <el-dropdown-item
                  v-if="!scope.row.confirmStatus"
                  @click="handleRevoke(scope.row)"
                >
                  {{ transformI18n("transaction.btnRevoke") }}
                </el-dropdown-item>
                <el-dropdown-item @click="handleExecute(scope.row)" divided>
                  {{ transformI18n("transaction.btnExecute") }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
      <!-- <el-table-column :label="transformI18n('assets.operation')">
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
            v-if="!scope.row.confirmStatus"
            type="danger"
            size="small"
            @click="handleRevoke(scope.row)"
          >
            {{ transformI18n("transaction.btnRevoke") }}
          </el-button>
        </template>
      </el-table-column> -->
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
