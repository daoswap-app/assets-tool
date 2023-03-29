<script setup lang="ts">
import { ref, watch, onMounted, PropType } from "vue";
import { FormInstance } from "element-plus";
import { transformI18n } from "@/plugins/i18n";
import { isChecksummedAddress, checksumAddress } from "@/utils/addresses";
import {
  useWeb3ModalStoreHook,
  type Web3Type,
  type ConnectedWalletType
} from "@/store/modules/web3Modal";
import { useWalletStoreHook } from "@/store/modules/wallet";
import { type AssetItem } from "@/config/constants";
import MultiSigWallet_ABI from "@/assets/abi/MultiSigWallet_abi.json";
import { getContractByABI, etherToWei } from "@/utils/web3";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object as PropType<AssetItem | null>,
    default: () => {
      return null;
    }
  },
  tokenList: {
    type: Object as PropType<AssetItem[]>,
    default: () => {
      return [];
    }
  }
});
// 变量
const loading = ref<boolean>(false);
const formVisible = ref(false);
const currentWalletAddress = ref<string>("");
const currentWallet = ref<ConnectedWalletType>(null);
const web3 = ref<Web3Type>(null);
// 表单数据
type transactionFormType = {
  sendAddress: string;
  recipientAddress: string;
  assetToken: string;
  amount: string;
};
// 表单数据
const defalutFormValue = {
  sendAddress: "",
  recipientAddress: "0x9b1d0c9c1aE96011776e6786b4Efe884665918D2",
  assetToken: "",
  amount: "0.001"
};
const transactionFormRef = ref<FormInstance>();
const transactionForm = ref<transactionFormType>(defalutFormValue);
onMounted(() => {
  currentWalletAddress.value = useWalletStoreHook().getWallet;
  currentWallet.value = useWeb3ModalStoreHook().getWallet;
  web3.value = useWeb3ModalStoreHook().getWeb3;
  transactionForm.value.sendAddress = currentWalletAddress.value;
});
// 方法
const validateRecipientAddress = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(
      new Error(transformI18n("transaction.please input recipient address"))
    );
  } else {
    transactionForm.value.recipientAddress = checksumAddress(
      transactionForm.value.recipientAddress
    );
    if (!isChecksummedAddress(transactionForm.value.recipientAddress)) {
      callback(
        new Error(transformI18n("transaction.invalid recipient address"))
      );
    } else {
      callback();
    }
  }
};
const checkForm = async () => {
  // 校验表单
  return await transactionFormRef.value.validate((valid: any) => {
    if (valid) {
      return true;
    } else {
      console.log("error submit!!");
      return false;
    }
  });
};
const submitForm = async () => {
  const checkRet = await checkForm();
  if (checkRet) {
    loading.value = true;
    // 调用合约
    const contract = getContractByABI(
      MultiSigWallet_ABI,
      useWalletStoreHook().getWallet,
      web3.value
    );
    // 发送交易，BNB
    contract.methods
      .submitTransaction(
        transactionForm.value.recipientAddress,
        etherToWei(transactionForm.value.amount, web3.value),
        []
      )
      .send({
        from: currentWallet.value.address
      })
      .then((res: any) => {
        console.info(res);
      })
      .catch((e: any) => {
        console.error(e);
      })
      .finally(() => {
        loading.value = false;
        closeDialog();
      });
  }
};
// 弹窗显示/隐藏
const closeDialog = () => {
  formVisible.value = false;
};
const emit = defineEmits(["update:visible"]);
watch(
  () => formVisible.value,
  val => {
    emit("update:visible", val);
  }
);
watch(
  () => props.visible,
  val => {
    formVisible.value = val;
  }
);
watch(
  () => props.data,
  val => {
    transactionForm.value.assetToken = val ? val.token : "";
  }
);
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :title="transformI18n('transaction.sendTokens')"
    width="80%"
    draggable
    :close-on-click-modal="false"
    :before-close="closeDialog"
  >
    <!-- 表单内容 -->
    <el-form
      ref="transactionFormRef"
      :model="transactionForm"
      label-width="100px"
      class="demo-ruleForm"
      :hide-required-asterisk="true"
    >
      <el-form-item
        prop="sendAddress"
        :label="transformI18n('transaction.sendAddress')"
        style="width: 100%"
      >
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="24">
            {{ transactionForm.sendAddress }}
          </el-col>
        </el-row>
      </el-form-item>
      <el-divider />
      <el-form-item
        prop="recipientAddress"
        :label="transformI18n('transaction.recipientAddress')"
        style="width: 100%"
        :rules="[{ validator: validateRecipientAddress, trigger: 'blur' }]"
      >
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="24">
            <el-input v-model="transactionForm.recipientAddress" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        prop="assetToken"
        :label="transformI18n('transaction.assetToken')"
        style="width: 100%"
      >
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="24">
            <el-select v-model="transactionForm.assetToken" style="width: 100%">
              <el-option
                v-for="item in props.tokenList"
                :key="item.token"
                :label="item.symbol + (item.token ? ' - ' + item.token : '')"
                :value="item.token"
              />
            </el-select>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        prop="amount"
        :label="transformI18n('transaction.amount')"
        style="width: 100%"
        :rules="[
          {
            required: true,
            message: transformI18n('transaction.please input amount'),
            trigger: 'blur'
          }
        ]"
      >
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="24">
            <el-input v-model="transactionForm.amount" />
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <!-- 操作 -->
    <template #footer>
      <el-button v-loading="loading" @click="closeDialog">
        {{ transformI18n("wallet.btnCancel") }}
      </el-button>
      <el-button v-loading="loading" type="primary" @click="submitForm">
        {{ transformI18n("wallet.btnSubmit") }}
      </el-button>
    </template>
  </el-dialog>
</template>
