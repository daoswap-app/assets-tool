<script setup lang="ts">
import { ref, reactive, watch, onMounted } from "vue";
import { FormInstance } from "element-plus";
import { transformI18n } from "@/plugins/i18n";
import { isChecksummedAddress, checksumAddress } from "@/utils/addresses";
import { useOnboardStoreHook } from "@/store/modules/onboard";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object,
    default: () => {
      return {};
    }
  },
  tokenList: {
    type: Object,
    default: () => {
      return [];
    }
  }
});
const formVisible = ref(false);
const currentWalletAddress = ref<string>("");
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
  recipientAddress: "",
  assetToken: "",
  amount: ""
};
const transactionFormRef = ref<FormInstance>();
const transactionForm = reactive<transactionFormType>(defalutFormValue);
onMounted(() => {
  currentWalletAddress.value = useOnboardStoreHook().getWallet.address;
});
// 方法
const validateRecipientAddress = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(
      new Error(transformI18n("transaction.please input recipient address"))
    );
  } else {
    transactionForm.recipientAddress = checksumAddress(
      transactionForm.recipientAddress
    );
    if (!isChecksummedAddress(transactionForm.recipientAddress)) {
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
    console.info(transactionForm);
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
  () => props.data.token,
  val => {
    transactionForm.assetToken = val;
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
        :rules="[
          {
            required: true,
            message: transformI18n('transaction.please select asset token'),
            trigger: 'change'
          }
        ]"
      >
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="24">
            <el-select v-model="transactionForm.assetToken" style="width: 100%">
              <el-option
                v-for="item in props.tokenList"
                :key="item.token"
                :label="item.name + ' - ' + item.token"
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
      <el-button @click="closeDialog">
        {{ transformI18n("wallet.btnCancel") }}
      </el-button>
      <el-button type="primary" @click="submitForm">
        {{ transformI18n("wallet.btnSubmit") }}
      </el-button>
    </template>
  </el-dialog>
</template>
