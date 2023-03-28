<script setup lang="ts">
import { ref, onMounted } from "vue";
import { transformI18n } from "@/plugins/i18n";
import { JsonRpcProvider } from "@ethersproject/providers";
import {
  useOnboardStoreHook,
  type ConnectedWalletType
} from "@/store/modules/onboard";
import { useWeb3StoreHook } from "@/store/modules/web3";
import { formatVisualAmount } from "@/utils/formatters";

import { tableDataQueue, tableDataHistory } from "./data";

// 变量
const loading = ref<boolean>(false);
const connectedWallet = ref<ConnectedWalletType | null>(null);
const web3 = ref<JsonRpcProvider | null>(null);
const balance = ref<string>("0");
const token = ref<string>("BNB");

// 方法
async function getConnectedWallet() {
  loading.value = true;
  connectedWallet.value = useOnboardStoreHook().getWallet;
  if (web3.value) {
    const network = await web3.value.getNetwork();
    const balanceValue = await web3.value.getBalance(
      connectedWallet.value.address
    );
    token.value = network.name;
    balance.value = formatVisualAmount(balanceValue, 18);
  }
  loading.value = false;
}
async function getWeb3() {
  web3.value = useWeb3StoreHook().getWeb3;
}
// 订阅监听
useOnboardStoreHook().$subscribe(() => {
  getConnectedWallet();
});
useWeb3StoreHook().$subscribe(() => {
  getWeb3();
});

onMounted(() => {
  getConnectedWallet();
  getWeb3();
});

const selected = ref("1");

function tabClick({ index }) {
  selected.value = index;
}

defineOptions({
  name: "Transactions"
});
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
            <el-table-column :label="transformI18n('assets.asset')">
              <template v-slot="scope">
                <div style="display: flex; align-items: left">
                  <i class="el-icon-time" />
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="transformI18n('assets.balance')">
              <template v-slot="scope">
                <div style="display: flex; align-items: left">
                  <span>{{ scope.row.balance }}</span>
                  <span style="margin-left: 3px">{{ scope.row.symbol }}</span>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :label="transformI18n('transaction.history')" name="1">
          <el-table :data="tableDataHistory" style="width: 100%">
            <el-table-column :label="transformI18n('assets.asset')">
              <template v-slot="scope">
                <div style="display: flex; align-items: left">
                  <i class="el-icon-time" />
                  <span style="margin-left: 10px">{{ scope.row.name }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="transformI18n('assets.balance')">
              <template v-slot="scope">
                <div style="display: flex; align-items: left">
                  <span>{{ scope.row.balance }}</span>
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
