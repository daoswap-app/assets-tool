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
import SendTransaction from "@/components/Wallet/SendTransaction.vue";

import { tableData } from "./data";

// 变量
const loading = ref<boolean>(false);
const connectedWallet = ref<ConnectedWalletType | null>(null);
const web3 = ref<JsonRpcProvider | null>(null);
const balance = ref<string>("0");
const token = ref<string>("BNB");

const INITIAL_DATA = {
  name: "",
  status: "",
  description: "",
  type: "",
  mark: ""
};
const formDialogVisible = ref(false);
const formData = ref({ ...INITIAL_DATA });

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

const handleSend = (row: any) => {
  formDialogVisible.value = true;
  formData.value = row;
};

onMounted(() => {
  getConnectedWallet();
  getWeb3();
});

defineOptions({
  name: "Assets"
});
</script>

<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">{{ transformI18n("assets.assets") }}</span>
        </div>
      </template>
      <el-table :data="tableData" style="width: 100%">
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
        <el-table-column :label="transformI18n('assets.operation')">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="small"
              @click="handleSend(scope.row)"
            >
              {{ transformI18n("wallet.btnSend") }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <SendTransaction
      v-model:visible="formDialogVisible"
      :data="formData"
      :tokenList="tableData"
    />
  </div>
</template>
