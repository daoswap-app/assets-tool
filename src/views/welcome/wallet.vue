<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { transformI18n } from "@/plugins/i18n";
import AddWallet from "@/components/Wallet/AddWallet.vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import AddFill from "@iconify-icons/ri/add-circle-line";
import { useWalletStoreHook } from "@/store/modules/wallet";
import {
  type ConnectedWalletType,
  type Web3Type
} from "@/store/modules/web3Modal";
import Wallet_ABI from "@/assets/abi/Wallet_abi.json";
import { WALLET_CONTRACT_ADDRESSES, type WalletItem } from "@/config/constants";
import { getContractByABI } from "@/utils/web3";
import WalletTable from "./components/WalletTable.vue";

defineOptions({
  name: "HomeWallet"
});

const props = defineProps({
  connectedWallet: {
    type: Object as PropType<ConnectedWalletType>,
    default: null
  },
  web3: {
    type: Object as PropType<Web3Type>,
    default: null
  }
});

const walletList = ref<WalletItem[]>([]);
const dataLoading = ref(true);
const defaultWallet = ref<string>(null);

const getWalletListData = async () => {
  try {
    defaultWallet.value = useWalletStoreHook().getWallet;
    // 查询钱包列表
    const contractWallet = getContractByABI(
      Wallet_ABI,
      WALLET_CONTRACT_ADDRESSES[props.connectedWallet.chainId],
      props.web3
    );
    const myWalletList = await contractWallet.methods.getWalletList().call({
      from: props.connectedWallet.address
    });
    walletList.value = myWalletList;
    if (walletList.value.length > 0) {
      if (!defaultWallet.value) {
        useWalletStoreHook().setDefaultWallet(walletList.value[0].token);
        defaultWallet.value = walletList.value[0].token;
      } else {
        const filterDefault = walletList.value.filter(
          (wallet: WalletItem) =>
            wallet.token.toLowerCase() === defaultWallet.value.toLowerCase()
        );
        if (filterDefault.length <= 0) {
          useWalletStoreHook().setDefaultWallet(walletList.value[0].token);
          defaultWallet.value = walletList.value[0].token;
        }
      }
    } else {
      useWalletStoreHook().removeDefaultWallet();
    }
  } catch (e) {
    console.log(e);
  } finally {
    dataLoading.value = false;
  }
};
// 添加钱包弹窗
const formDialogVisible = ref(false);
const formData = ref<WalletItem>(null);
// 更新钱包弹窗数据
const handleManageWallet = (wallet?: WalletItem) => {
  formDialogVisible.value = true;
  nextTick(() => {
    formData.value = wallet ?? null;
  });
};
// 修改默认钱包
const handleChangeWallet = (wallet: WalletItem) => {
  useWalletStoreHook().setDefaultWallet(wallet.token);
  getWalletListData();
};
// 刷新列表
const handleRefreshWalletList = () => {
  getWalletListData();
};

onMounted(() => {
  getWalletListData();
});
</script>

<template>
  <div class="main">
    <div class="w-full flex justify-between mb-4">
      <!-- 添加 -->
      <el-button :icon="useRenderIcon(AddFill)" @click="handleManageWallet()">
        {{ transformI18n("wallet.btnAdd") }}
      </el-button>
    </div>
    <WalletTable
      v-loading="dataLoading"
      :data="walletList"
      :connectedWallet="props.connectedWallet"
      :web3="props.web3"
      :currentWallet="defaultWallet"
      @change-wallet="handleChangeWallet"
      @refresh-wallet-list="handleRefreshWalletList"
    />
    <AddWallet
      v-model:visible="formDialogVisible"
      :data="formData"
      @refresh-wallet-list="handleRefreshWalletList"
    />
  </div>
</template>
