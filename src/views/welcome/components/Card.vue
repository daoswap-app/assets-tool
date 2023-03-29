<script setup lang="ts">
import { PropType } from "vue";
import { transformI18n } from "@/plugins/i18n";
import WalletFilled from "@/assets/svg/wallet-filled.svg?component";
import More2Fill from "@iconify-icons/ri/more-2-fill";
import { type WalletItem } from "@/config/constants";
import { trunc } from "@/utils/string";

defineOptions({
  name: "ReCard"
});

const props = defineProps({
  wallet: {
    type: Object as PropType<WalletItem>
  },
  defaultWallet: {
    type: String,
    default: null
  }
});

const isCurrentWallet =
  props.wallet.token.toLowerCase() === props.defaultWallet.toLowerCase();

const emit = defineEmits(["manage-wallet", "change-wallet"]);
const handleClickManage = (wallet: WalletItem) => {
  emit("manage-wallet", wallet);
};
const handleChangeWallet = (wallet: WalletItem) => {
  emit("change-wallet", wallet);
};

// const handleClickDelete = (wallet: WalletItem) => {
//   emit("delete-item", wallet);
// };
</script>

<template>
  <div class="list-card-item">
    <div class="list-card-item_detail bg-bg_color">
      <el-row justify="space-between">
        <!-- 图标 -->
        <div class="list-card-item_detail--logo">
          <WalletFilled />
        </div>
        <div class="list-card-item_detail--operation">
          <!-- 状态 -->
          <el-tag
            color="#00a870"
            effect="dark"
            class="mx-1 list-card-item_detail--operation--tag"
          >
            {{ wallet.threshold }} / {{ wallet.ownerCount }}
          </el-tag>
          <!-- 操作 -->
          <el-dropdown trigger="click">
            <IconifyIconOffline :icon="More2Fill" class="text-[24px]" />
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="handleClickManage(wallet)">
                  {{ transformI18n("wallet.btnModify") }}
                </el-dropdown-item>
                <!-- <el-dropdown-item @click="handleClickDelete(wallet)">
                  {{ transformI18n("wallet.btnDelete") }}
                </el-dropdown-item> -->
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-row>
      <!-- 内容 -->
      <p class="list-card-item_detail--name text-text_color_primary">
        {{ transformI18n("wallet.address") }}:
        <el-tooltip
          class="item"
          effect="dark"
          :content="wallet.token"
          placement="top-start"
        >
          <span style="font-weight: bold">{{ trunc(wallet.token) }}</span>
        </el-tooltip>
      </p>
      <p class="list-card-item_detail--name text-text_color_primary">
        {{ transformI18n("wallet.name") }}:
        <span style="font-weight: bold">{{ wallet.name }}</span>
      </p>
      <p class="list-card-item_detail--name text-text_color_primary">
        {{ transformI18n("wallet.ownerCount") }}:
        <span style="font-weight: bold">{{ wallet.ownerCount }}</span>
      </p>
      <!-- 操作 -->
      <el-divider />
      <el-button
        class="w-full"
        size="default"
        type="primary"
        :disabled="isCurrentWallet"
        @click="handleChangeWallet(wallet)"
      >
        {{
          isCurrentWallet
            ? transformI18n("wallet.btnSelectedWallet")
            : transformI18n("wallet.btnChangeWallet")
        }}
      </el-button>
    </div>
  </div>
</template>

<style scoped lang="scss">
.list-card-item {
  display: flex;
  flex-direction: column;
  margin-bottom: 12px;
  border-radius: 3px;
  overflow: hidden;

  &_detail {
    flex: 1;
    padding: 24px 32px;
    min-height: 140px;

    &--logo {
      width: 56px;
      height: 56px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #e0ebff;
      font-size: 32px;
      color: #0052d9;

      &__disabled {
        color: #a1c4ff;
      }
    }

    &--operation {
      display: flex;
      height: 100%;

      &--tag {
        border: 0;
      }
    }

    &--name {
      margin: 24px 0 8px 0;
      font-size: 16px;
      font-weight: 400;
    }

    &--desc {
      font-size: 12px;
      line-height: 20px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin-bottom: 24px;
      height: 40px;
    }
  }

  &__disabled {
    .list-card-item_detail--name,
    .list-card-item_detail--desc {
      color: var(--el-text-color-disabled);
    }

    .list-card-item_detail--operation--tag {
      color: #bababa;
    }
  }
}
</style>
