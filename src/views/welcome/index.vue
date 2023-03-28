<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import Balance from "./balance.vue";
import Wallet from "./wallet.vue";
import {
  useWeb3ModalStoreHook,
  type Web3Type,
  type ConnectedWalletType
} from "@/store/modules/web3Modal";

defineOptions({
  name: "Welcome"
});

// 变量
const loading = ref<boolean>(false);
const web3 = ref<Web3Type | null>(null);
const connectedWallet = ref<ConnectedWalletType | null>(null);
// 方法
async function getWeb3() {
  loading.value = true;
  web3.value = useWeb3ModalStoreHook().getWeb3;
  connectedWallet.value = useWeb3ModalStoreHook().getWallet;
  loading.value = false;
}
// 订阅监听
// watch(
//   () => useWeb3ModalStoreHook().getWalletAddress,
//   () => {
//     getWeb3();
//   }
// );

watch([useWeb3ModalStoreHook().connectedWallet], () => {
  getWeb3();
});
// useWeb3ModalStoreHook().$subscribe(() => {
//   getWeb3();
// });

onMounted(() => {
  getWeb3();
});
</script>

<template>
  <div v-if="connectedWallet && web3">
    <div>
      <Balance :connectedWallet="connectedWallet" :web3="web3" />
    </div>
    <div class="mt-4 mb-12">
      <Wallet :connectedWallet="connectedWallet" :web3="web3" />
    </div>
  </div>
</template>
