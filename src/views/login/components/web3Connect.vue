<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { transformI18n } from "@/plugins/i18n";
import Web3 from "web3";
import { useUserStoreHook } from "@/store/modules/user";
import {
  useWeb3ModalStoreHook,
  type ConnectedWalletType
} from "@/store/modules/web3Modal";
import { initRouter } from "@/router/utils";
import { message } from "@/utils/message";

const router = useRouter();
const loading = ref(false);

const web3 = ref<Web3>(null);

async function connect() {
  try {
    loading.value = true;
    useWeb3ModalStoreHook()
      .getConnectedWallet()
      .then(async (connectedWallet: ConnectedWalletType) => {
        web3.value = useWeb3ModalStoreHook().getWeb3;
        if (connectedWallet.address) {
          await onLogin();
        }
        // web3.value = web3;
        // const accounts = await web3.eth.getAccounts();
        // if (accounts.length > 0) {
        //   await onLogin();
        // }
        loading.value = false;
      });
    loading.value = false;
  } catch (error) {
    console.error(error);
    loading.value = false;
  }
}
function disconnect() {
  useWeb3ModalStoreHook().disconnectWallet();
  useUserStoreHook().logOut();
}

const onLogin = async () => {
  loading.value = true;
  useUserStoreHook()
    .loginByUsername({ username: "admin", password: "admin123" })
    .then(res => {
      if (res.success) {
        // 获取后端路由
        initRouter().then(() => {
          router.push("/");
          message("登录成功", { type: "success" });
        });
      }
    });
  loading.value = false;
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }: KeyboardEvent) {
  if (code === "Enter") {
    onLogin();
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
  // getConnectedWallet();
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
</script>

<template>
  <div>
    <div class="container">
      <div class="wallet" v-if="web3">
        <!-- <div class="avatar" /> -->
        <!-- <div class="details">
          <span>Connected Wallet: {{ web3.eth.ens }}</span>
        </div> -->
        <el-button
          class="w-full"
          size="default"
          type="danger"
          :loading="loading"
          @click="disconnect"
        >
          {{ transformI18n("web3.disconnect") }}
        </el-button>
      </div>
      <div v-else>
        <el-button
          class="w-full"
          size="default"
          type="primary"
          :loading="loading"
          @click="connect"
        >
          {{ transformI18n("web3.connectWallet") }}
        </el-button>
      </div>
    </div>
  </div>

  <!-- <el-button class="w-full" size="default" type="primary">
    {{ t("web3.connect") }}
  </el-button> -->
</template>

<style scoped>
:root {
  /* CUSTOMIZE THE COLOR  PALETTE */
  --onboard-white: white;
  --onboard-black: black;
  --onboard-primary-1: #2f80ed;
  --onboard-primary-100: #eff1fc;
  --onboard-primary-200: #d0d4f7;
  --onboard-primary-300: #b1b8f2;
  --onboard-primary-400: #929bed;
  --onboard-primary-500: #6370e5;
  --onboard-primary-600: #454ea0;
  --onboard-primary-700: #323873;
  --onboard-gray-100: #ebebed;
  --onboard-gray-200: #c2c4c9;
  --onboard-gray-300: #999ca5;
  --onboard-gray-400: #707481;
  --onboard-gray-500: #33394b;
  --onboard-gray-600: #242835;
  --onboard-gray-700: #1a1d26;
  --onboard-success-100: #d1fae3;
  --onboard-success-200: #baf7d5;
  --onboard-success-300: #a4f4c6;
  --onboard-success-400: #8df2b8;
  --onboard-success-500: #5aec99;
  --onboard-success-600: #18ce66;
  --onboard-success-700: #129b4d;
  --onboard-danger-100: #ffe5e6;
  --onboard-danger-200: #ffcccc;
  --onboard-danger-300: #ffb3b3;
  --onboard-danger-400: #ff8080;
  --onboard-danger-500: #ff4f4f;
  --onboard-danger-600: #cc0000;
  --onboard-danger-700: #660000;
  --onboard-warning-100: #ffefcc;
  --onboard-warning-200: #ffe7b3;
  --onboard-warning-300: #ffd780;
  --onboard-warning-400: #ffc74c;
  --onboard-warning-500: #ffaf00;
  --onboard-warning-600: #cc8c00;
  --onboard-warning-700: #664600;

  /* FONTS */
  --onboard-font-family-normal: Sofia Pro;
  --onboard-font-family-semibold: Sofia Pro Semibold;
  --onboard-font-family-light: Sofia Pro Light;

  --onboard-font-size-1: 3rem;
  --onboard-font-size-2: 2.25rem;
  --onboard-font-size-3: 1.5rem;
  --onboard-font-size-4: 1.25rem;
  --onboard-font-size-5: 1rem;
  --onboard-font-size-6: 0.875rem;
  --onboard-font-size-7: 0.75rem;

  /* SPACING */
  --onboard-spacing-1: 3rem;
  --onboard-spacing-2: 2rem;
  --onboard-spacing-3: 1.5rem;
  --onboard-spacing-4: 1rem;
  --onboard-spacing-5: 0.5rem;

  /* BORDER RADIUS */
  --onboard-border-radius-1: 24px;
  --onboard-border-radius-2: 20px;
  --onboard-border-radius-3: 16px;

  /* SHADOWS */
  --onboard-shadow-0: none;
  --onboard-shadow-1: 0px 4px 12px rgba(0, 0, 0, 0.1);
  --onboard-shadow-2: inset 0px -1px 0px rgba(0, 0, 0, 0.1);

  /* HARDWARE WALLET STYLES  */
  /* *if not set will fallback to variables with `--onboard` prefix shown above */

  /* COLORS */
  --account-select-modal-white: white;
  --account-select-modal-black: black;
  --account-select-modal-primary-100: #eff1fc;
  --account-select-modal-primary-200: #d0d4f7;
  --account-select-modal-primary-300: #b1b8f2;
  --account-select-modal-primary-500: #6370e5;
  --account-select-modal-primary-600: #454ea0;
  --account-select-modal-gray-100: #ebebed;
  --account-select-modal-gray-200: #c2c4c9;
  --account-select-modal-gray-300: #999ca5;
  --account-select-modal-gray-500: #33394b;
  --account-select-modal-gray-700: #1a1d26;
  --account-select-modal-danger-500: #ff4f4f;

  /* FONTS */
  --account-select-modal-font-family-normal: Sofia Pro;
  --account-select-modal-font-family-light: Sofia Pro Light;
  --account-select-modal-font-size-5: 1rem;
  --account-select-modal-font-size-7: 0.75rem;
  --account-select-modal-font-line-height-1: 24px;

  /* SPACING */
  --account-select-modal-margin-4: 1rem;
  --account-select-modal-margin-5: 0.5rem;

  /* CUSTOMIZE SECTIONS OF THE CONNECT MODAL */
  --onboard-connect-sidebar-background: black;
  --onboard-connect-sidebar-color: white;
  --onboard-connect-sidebar-progress-background: green;
  --onboard-connect-sidebar-progress-color: red;
}
</style>
