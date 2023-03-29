<script setup lang="ts">
import { ref, onMounted, nextTick } from "vue";
import { transformI18n } from "@/plugins/i18n";
import Card from "./components/Card.vue";
// import { message } from "@/utils/message";
// import { ElMessageBox } from "element-plus";
// import dialogForm from "./components/DialogForm.vue";
import AddWallet from "@/components/Wallet/AddWallet.vue";
import { useRenderIcon } from "@/components/ReIcon/src/hooks";
import Search from "@iconify-icons/ep/search";
import AddFill from "@iconify-icons/ri/add-circle-line";
import {
  type ConnectedWalletType,
  type Web3Type
} from "@/store/modules/web3Modal";
import Wallet_ABI from "@/assets/abi/Wallet_abi.json";
import { WALLET_CONTRACT_ADDRESSES, type WalletItem } from "@/config/constants";
import { getContractByABI } from "@/utils/web3";
import { useWalletStoreHook } from "@/store/modules/wallet";

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

const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `;

const pagination = ref({ current: 1, pageSize: 12, total: 0 });

const walletList = ref<WalletItem[]>([]);
const dataLoading = ref(true);
const defaultWallet = ref<string>(null);

const getCardListData = async () => {
  try {
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
    // 分页
    pagination.value = {
      ...pagination.value,
      total: walletList.value.length
    };
  } catch (e) {
    console.log(e);
  } finally {
    setTimeout(() => {
      dataLoading.value = false;
    }, 500);
  }
};

onMounted(() => {
  getCardListData();
});

const formDialogVisible = ref(false);
const formData = ref<WalletItem>(null);
const searchValue = ref("");

const onPageSizeChange = (size: number) => {
  pagination.value.pageSize = size;
  pagination.value.current = 1;
};
const onCurrentChange = (current: number) => {
  pagination.value.current = current;
};
// const handleDeleteItem = wallet => {
//   ElMessageBox.confirm(
//     wallet ? `确认删除后${wallet.name}的所有产品信息将被清空, 且无法恢复` : "",
//     "提示",
//     {
//       type: "warning"
//     }
//   )
//     .then(() => {
//       message("删除成功", { type: "success" });
//     })
//     .catch(() => {});
// };
const handleManageWallet = (wallet?: WalletItem) => {
  formDialogVisible.value = true;
  nextTick(() => {
    formData.value = wallet ?? null;
  });
};
const handleChangeWallet = (wallet: WalletItem) => {
  nextTick(() => {
    dataLoading.value = true;
    useWalletStoreHook().setDefaultWallet(wallet.token);
    pagination.value.total = 0;
    getCardListData();
  });
};
</script>

<template>
  <div class="main">
    <div class="w-full flex justify-between mb-4">
      <!-- 添加 -->
      <el-button :icon="useRenderIcon(AddFill)" @click="handleManageWallet()">
        {{ transformI18n("wallet.btnAdd") }}
      </el-button>
      <!-- 搜索 -->
      <el-input
        style="width: 300px"
        v-model="searchValue"
        :placeholder="transformI18n('wallet.address')"
        clearable
      >
        <template #suffix>
          <el-icon class="el-input__icon">
            <IconifyIconOffline
              v-show="searchValue.length === 0"
              :icon="Search"
            />
          </el-icon>
        </template>
      </el-input>
    </div>
    <div
      v-loading="dataLoading"
      :element-loading-svg="svg"
      element-loading-svg-view-box="-10, -10, 50, 50"
    >
      <el-empty
        description="暂无数据"
        v-show="
          walletList
            .slice(
              pagination.pageSize * (pagination.current - 1),
              pagination.pageSize * pagination.current
            )
            .filter(v =>
              v.name.toLowerCase().includes(searchValue.toLowerCase())
            ).length === 0
        "
      />
      <template v-if="pagination.total > 0">
        <el-row :gutter="16">
          <el-col
            v-for="(wallet, index) in walletList
              .slice(
                pagination.pageSize * (pagination.current - 1),
                pagination.pageSize * pagination.current
              )
              .filter(v =>
                v.name.toLowerCase().includes(searchValue.toLowerCase())
              )"
            :key="index"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
          >
            <Card
              :wallet="wallet"
              :default-wallet="defaultWallet"
              @manage-wallet="handleManageWallet"
              @change-wallet="handleChangeWallet"
            />
          </el-col>
        </el-row>
        <el-pagination
          class="float-right"
          v-model:currentPage="pagination.current"
          :page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[12, 24, 36]"
          :background="true"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="onPageSizeChange"
          @current-change="onCurrentChange"
        />
      </template>
    </div>
    <AddWallet v-model:visible="formDialogVisible" :data="formData" />
  </div>
</template>
