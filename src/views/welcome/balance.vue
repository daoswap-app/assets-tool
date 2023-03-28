<script setup lang="ts">
import { ref, PropType, onMounted } from "vue";
import { transformI18n } from "@/plugins/i18n";
import {
  type Web3Type,
  type ConnectedWalletType
} from "@/store/modules/web3Modal";
import { formatVisualAmount } from "@/utils/formatters";

defineOptions({
  name: "HomeBalance"
});

const props = defineProps({
  connectedWallet: {
    type: Object as PropType<ConnectedWalletType>,
    default: null
  },
  web3: {
    type: Object as PropType<any>,
    default: null
  }
});
// 变量
const loading = ref<boolean>(false);
const connectedWallet = ref<ConnectedWalletType | null>(null);
const web3 = ref<Web3Type | null>(null);
const balance = ref<string>("0");
const symbol = ref<string>("BNB");

// 方法
async function loadData() {
  loading.value = true;
  connectedWallet.value = props.connectedWallet;
  web3.value = props.web3;
  if (web3.value) {
    // const network = await web3.value.eth.getCode();
    const balanceValue = await web3.value.eth.getBalance(
      connectedWallet.value.address
    );
    // symbol.value = network.name;
    balance.value = formatVisualAmount(balanceValue, 18);
  }
  loading.value = false;
}
// 加载
onMounted(() => {
  loadData();
});
// // 订阅监听
// watch([props.connectedWallet.address], () => {
//   loadData();
// });
</script>

<template>
  <div>
    <el-card v-loading="loading" shadow="never">
      <template #header>
        <div class="card-header">
          <span class="font-medium">{{ transformI18n("account.info") }}</span>
        </div>
      </template>
      <el-descriptions :column="1" border>
        <el-descriptions-item>
          <template v-slot:label>
            {{ transformI18n("account.address") }}
          </template>
          {{ connectedWallet?.address ?? "" }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template v-slot:label>
            {{ transformI18n("account.balance") }}
          </template>
          {{ balance + " " + symbol }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>
