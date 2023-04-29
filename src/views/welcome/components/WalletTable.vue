<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { transformI18n } from "@/plugins/i18n";
import { type WalletItem } from "@/config/constants";
import {
  type ConnectedWalletType,
  type Web3Type
} from "@/store/modules/web3Modal";
import ChangeThreshold from "@/components/Wallet/ChangeThreshold.vue";
import AddOwner from "@/components/Wallet/AddOwner.vue";
import SwapOwner from "@/components/Wallet/SwapOwner.vue";
import RemoveOwner from "@/components/Wallet/RemoveOwner.vue";
import ArrowDownSLine from "@iconify-icons/ri/arrow-down-s-line";

defineOptions({
  name: "WalletTable"
});

const props = defineProps({
  data: {
    type: Object as PropType<WalletItem[]>,
    default: () => {
      return [];
    }
  },
  connectedWallet: {
    type: Object as PropType<ConnectedWalletType>,
    default: null
  },
  web3: {
    type: Object as PropType<Web3Type>,
    default: null
  },
  currentWallet: {
    type: String,
    default: ""
  }
});

// 变量
const loading = ref<boolean>(false);
const tableData = ref<WalletItem[]>([]);
// 弹窗数据
const formData = ref<WalletItem>(null);
const selectOwner = ref<string>("");
const dialogVisibleOfChangeThreshold = ref<boolean>(false);
const dialogVisibleOfAddOwner = ref<boolean>(false);
const dialogVisibleOfSwapOwner = ref<boolean>(false);
const dialogVisibleOfRemoveOwner = ref<boolean>(false);
// 方法
const emit = defineEmits(["refresh-wallet-list", "change-wallet"]);
// 刷新数据
const handleRefreshData = () => {
  emit("refresh-wallet-list");
};
// 修改默认钱包
const handleChangeWallet = (wallet: WalletItem) => {
  emit("change-wallet", wallet);
};
// 修改确认数量
const handleChangeThreshold = (wallet: WalletItem) => {
  formData.value = wallet;
  dialogVisibleOfChangeThreshold.value = true;
};
// 添加所有者
const handleAddOwner = (wallet: WalletItem) => {
  formData.value = wallet;
  dialogVisibleOfAddOwner.value = true;
};
// 替换所有者
const handleSwapOwner = (wallet: WalletItem, owner: string) => {
  formData.value = wallet;
  selectOwner.value = owner;
  dialogVisibleOfSwapOwner.value = true;
};
// 移除所有者
const handleRemoveOwner = (wallet: WalletItem, owner: string) => {
  formData.value = wallet;
  selectOwner.value = owner;
  dialogVisibleOfRemoveOwner.value = true;
};

watch(
  () => props.data,
  (val: WalletItem[]) => {
    loading.value = true;
    tableData.value = val;
    loading.value = false;
  }
);

onMounted(() => {
  if (
    props.data &&
    props.connectedWallet &&
    props.web3 &&
    props.currentWallet
  ) {
    tableData.value = props.data;
  }
});
</script>

<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column type="expand">
        <template v-slot="scope">
          <el-table :data="scope.row.owners" stripe style="width: 100%">
            <el-table-column :label="transformI18n('wallet.address')">
              <template v-slot="owner">
                <div style="display: flex; align-items: left">
                  <span>{{ owner.row }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="transformI18n('wallet.operation')">
              <template v-slot="owner">
                <el-dropdown trigger="click">
                  <IconifyIconOffline
                    :icon="ArrowDownSLine"
                    class="text-[24px]"
                  />
                  <template #dropdown>
                    <el-dropdown-menu>
                      <!-- 替换所有者 -->
                      <el-dropdown-item
                        @click="handleSwapOwner(scope.row, owner.row)"
                      >
                        {{ transformI18n("wallet.btnSwapOwner") }}
                      </el-dropdown-item>
                      <!-- 删除所有者 -->
                      <el-dropdown-item
                        v-if="scope.row.owners.length > 1"
                        @click="handleRemoveOwner(scope.row, owner.row)"
                        divided
                      >
                        {{ transformI18n("wallet.btnDelete") }}
                      </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column :label="transformI18n('wallet.address')">
        <template v-slot="scope">
          <div style="display: flex; align-items: left">
            <span>{{ scope.row.token }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="transformI18n('wallet.name')">
        <template v-slot="scope">
          <div style="display: flex; align-items: left">
            <span>{{ scope.row.name }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="
          transformI18n('wallet.confirmNumber') +
          '/' +
          transformI18n('wallet.ownerCount')
        "
      >
        <template v-slot="scope">
          <div style="display: flex; align-items: left">
            <span>
              {{ scope.row.threshold }} / {{ scope.row.ownerCount }}
            </span>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="transformI18n('wallet.operation')">
        <template v-slot="scope">
          <el-dropdown trigger="click">
            <IconifyIconOffline :icon="ArrowDownSLine" class="text-[24px]" />
            <template #dropdown>
              <el-dropdown-menu>
                <!-- 修改默认钱包 -->
                <el-dropdown-item
                  :disabled="
                    scope.row.token.toLowerCase() ===
                    props.currentWallet.toLowerCase()
                  "
                  @click="handleChangeWallet(scope.row)"
                >
                  {{
                    scope.row.token.toLowerCase() ===
                    props.currentWallet.toLowerCase()
                      ? transformI18n("wallet.btnSelectedWallet")
                      : transformI18n("wallet.btnChangeWallet")
                  }}
                </el-dropdown-item>
                <!-- 重命名 -->
                <!-- <el-dropdown-item @click="handleAddOwner(scope.row)" divided>
                  {{ transformI18n("wallet.btnRename") }}
                </el-dropdown-item> -->
                <!-- 添加所有者 -->
                <el-dropdown-item @click="handleAddOwner(scope.row)" divided>
                  {{ transformI18n("wallet.btnAddOwner") }}
                </el-dropdown-item>
                <!-- 修改确认数量 -->
                <el-dropdown-item @click="handleChangeThreshold(scope.row)">
                  {{ transformI18n("wallet.btnChangeThreshold") }}
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
    <AddOwner
      v-if="props.web3"
      v-model:visible="dialogVisibleOfAddOwner"
      :data="formData"
      :connectedWallet="props.connectedWallet"
      :web3="props.web3"
      @refresh-data="handleRefreshData"
    />
    <ChangeThreshold
      v-if="props.web3"
      v-model:visible="dialogVisibleOfChangeThreshold"
      :data="formData"
      :connectedWallet="props.connectedWallet"
      :web3="props.web3"
      @refresh-data="handleRefreshData"
    />
    <SwapOwner
      v-if="props.web3"
      v-model:visible="dialogVisibleOfSwapOwner"
      :data="formData"
      :connectedWallet="props.connectedWallet"
      :web3="props.web3"
      :owner="selectOwner"
      @refresh-data="handleRefreshData"
    />
    <RemoveOwner
      v-if="props.web3"
      v-model:visible="dialogVisibleOfRemoveOwner"
      :data="formData"
      :connectedWallet="props.connectedWallet"
      :web3="props.web3"
      :owner="selectOwner"
      @refresh-data="handleRefreshData"
    />
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
</style>
