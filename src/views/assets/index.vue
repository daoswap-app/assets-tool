<script setup lang="ts">
import { ref, onMounted } from "vue";
import { transformI18n } from "@/plugins/i18n";
import {
  useWeb3ModalStoreHook,
  type Web3Type
} from "@/store/modules/web3Modal";
import { formatVisualAmount } from "@/utils/formatters";
import SendTransaction from "@/components/Wallet/SendTransaction.vue";

import {
  TOKEN_LIST,
  type AssetItem,
  type TokenListType
} from "@/config/constants";
import { getChainInfo } from "@/config/chains";
import ERC20_ABI from "@/assets/abi/ERC20_abi.json";
import { getContractByABI } from "@/utils/web3";
import { useWalletStoreHook } from "@/store/modules/wallet";
import { hexValue } from "@ethersproject/bytes";

defineOptions({
  name: "Assets"
});

const tokenList = ref<string[]>([]);

// 变量
const loading = ref<boolean>(false);
const web3 = ref<Web3Type | null>(null);
const currentWallet = ref<string | null>(null);
const tableData = ref<AssetItem[]>([]);

const formDialogVisible = ref(false);
const formData = ref<AssetItem>(null);
const chainInfo = ref(null);

// 方法
async function getWeb3() {
  currentWallet.value = useWalletStoreHook().getWallet;
  web3.value = useWeb3ModalStoreHook().getWeb3;
  // 获取token列表
  const chainId = await web3.value.eth.getChainId();
  TOKEN_LIST[chainId].map((item: TokenListType) => {
    tokenList.value.push(item.token);
  });
  chainInfo.value = getChainInfo(hexValue(parseInt(chainId)));
}
// 查询资产列表
const getAssets = async () => {
  loading.value = true;
  tableData.value = [];
  if (currentWallet.value) {
    const balanceValue = await web3.value.eth.getBalance(currentWallet.value);
    tableData.value.push({
      symbol: chainInfo.value.token,
      token: "",
      balance: formatVisualAmount(balanceValue, 18)
    });
    const getResult = tokenList.value.map(async (token: string) => {
      const contract = getContractByABI(ERC20_ABI, token, web3.value);
      const symbol = await contract.methods.symbol().call();
      const decimals = await contract.methods.decimals().call();
      const balanceValue = await contract.methods
        .balanceOf(useWalletStoreHook().getWallet)
        .call();
      const item = {
        symbol: symbol,
        token: token,
        balance: formatVisualAmount(balanceValue, decimals)
      };
      tableData.value.push(item);
    });
    await Promise.all(getResult);
  }
  loading.value = false;
};
onMounted(() => {
  getWeb3();
  getAssets();
});

const handleSend = (row: any) => {
  formDialogVisible.value = true;
  formData.value = row;
};
// 刷新列表
const handleRefreshAssetList = () => {
  getAssets();
};
</script>

<template>
  <div>
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">{{
            transformI18n("assets.assets") + " - " + currentWallet
          }}</span>
        </div>
      </template>
      <el-table v-loading="loading" :data="tableData" style="width: 100%">
        <el-table-column :label="transformI18n('assets.asset')">
          <template v-slot="scope">
            <div style="display: flex; align-items: left">
              <i class="el-icon-time" />
              <span style="margin-left: 10px">{{ scope.row.symbol }}</span>
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
              v-if="scope.row.balance > 0"
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
      @refresh-asset-list="handleRefreshAssetList"
    />
  </div>
</template>
