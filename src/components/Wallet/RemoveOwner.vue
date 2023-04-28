<script setup lang="ts">
import { ref, watch, PropType } from "vue";
import { FormInstance } from "element-plus";
import { transformI18n } from "@/plugins/i18n";
import {
  type ConnectedWalletType,
  type Web3Type
} from "@/store/modules/web3Modal";
import MultiSigWallet_ABI from "@/assets/abi/MultiSigWallet_abi.json";
import { type WalletItem, SENTINEL_OWNERS_ADDRESS } from "@/config/constants";
import { getContractByABI } from "@/utils/web3";
import { isChecksummedAddress, checksumAddress } from "@/utils/addresses";

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  data: {
    type: Object as PropType<WalletItem | null>,
    default: () => {
      return null;
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
  owner: {
    type: String,
    default: ""
  }
});
// 变量
const loading = ref<boolean>(false);
const formVisible = ref<boolean>(false);
const ownerCount = ref<number>(0);
// 表单数据
type walletFormType = {
  owner: string;
  confirmNumber: number;
};

const emit = defineEmits(["update:visible", "refresh-data"]);

// 表单数据
const defalutFormValue = { owner: "", confirmNumber: 1 };
const walletFormRef = ref<FormInstance>();
const walletForm = ref<walletFormType>(defalutFormValue);
const prevOwner = ref<string>("");
// 方法
const validateAddress = (rule: any, value: string, callback: any) => {
  if (value === "") {
    callback(new Error(transformI18n("wallet.please input wallet address")));
  } else {
    walletForm.value.owner = checksumAddress(walletForm.value.owner);
    if (!isChecksummedAddress(walletForm.value.owner)) {
      callback(new Error(transformI18n("wallet.invalid wallet address")));
    } else {
      callback();
    }
  }
};
const checkForm = async () => {
  // 校验表单
  const formValidRet = await walletFormRef.value.validate((valid: any) => {
    if (valid) {
      return true;
    } else {
      console.log("error submit!!");
      return false;
    }
  });
  return formValidRet;
};
// 创建钱包
const submitForm = async () => {
  const checkRet = await checkForm();
  if (checkRet) {
    loading.value = true;
    // 调用合约
    const contract = getContractByABI(
      MultiSigWallet_ABI,
      props.data.token,
      props.web3
    );
    // 处理参数
    const dataEncode = await contract.methods
      .removeOwner(
        prevOwner.value,
        walletForm.value.owner,
        walletForm.value.confirmNumber
      )
      .encodeABI();
    const params = {
      destination: props.data.token,
      value: "0",
      data: dataEncode
    };
    // 发送交易
    contract.methods
      .submitTransaction(params.destination, params.value, params.data)
      .send({
        from: props.connectedWallet.address
      })
      .then(() => {
        emit("refresh-data");
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
// 查找前一个所有者地址
const getPrevOwner = async () => {
  const owners = props.data.owners;
  const indexFinder = owners.findIndex(
    (item: string) => item === walletForm.value.owner
  );
  const prevOwnerIndex = parseInt(indexFinder) - 1;
  if (prevOwnerIndex >= 0) {
    prevOwner.value = owners[prevOwnerIndex];
  } else {
    prevOwner.value = SENTINEL_OWNERS_ADDRESS;
  }
};
// 弹窗显示/隐藏
const closeDialog = () => {
  formVisible.value = false;
};
// 监听
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
    loading.value = true;
    if (val) {
      walletForm.value.owner = props.owner;
      ownerCount.value = parseInt(val.ownerCount) - 1;
      walletForm.value.confirmNumber =
        parseInt(val.threshold) <= ownerCount.value
          ? parseInt(val.threshold)
          : ownerCount.value;
    } else {
      walletForm.value = defalutFormValue;
    }
    getPrevOwner();
    loading.value = false;
  }
);
watch(
  () => props.owner,
  val => {
    walletForm.value.owner = val;
    getPrevOwner();
  }
);
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :title="transformI18n('wallet.removeOwner')"
    width="90%"
    draggable
    :close-on-click-modal="false"
    :before-close="closeDialog"
  >
    <!-- 表单内容 -->
    <el-form
      ref="walletFormRef"
      :model="walletForm"
      label-width="100px"
      class="demo-ruleForm"
      :hide-required-asterisk="true"
      label-position="top"
    >
      <el-form-item
        prop="owner"
        :label="transformI18n('wallet.owners')"
        style="width: 100%"
        :rules="[{ validator: validateAddress, trigger: 'blur' }]"
      >
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="24">
            <el-input v-model="walletForm.owner" :disabled="true" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-divider />
      <el-form-item
        prop="confirmNumber"
        :label="transformI18n('wallet.confirmNumber')"
        style="width: 100%"
        :rules="[
          {
            required: true,
            message: transformI18n('wallet.please select confirm number'),
            trigger: 'change'
          }
        ]"
      >
        <el-row :gutter="20" style="width: 100%">
          <el-col :xs="8" :md="2">
            <el-select v-model="walletForm.confirmNumber">
              <el-option
                v-for="item in ownerCount"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
          <el-col :xs="1" :md="1">/</el-col>
          <el-col :xs="8" :md="2">
            {{ ownerCount }}
          </el-col>
          <el-col :xs="7" :md="19" />
        </el-row>
      </el-form-item>
    </el-form>
    <!-- 操作 -->
    <template #footer>
      <el-button :loading="loading" @click="closeDialog">
        {{ transformI18n("wallet.btnCancel") }}
      </el-button>
      <el-button :loading="loading" type="primary" @click="submitForm">
        {{ transformI18n("wallet.btnSubmit") }}
      </el-button>
    </template>
  </el-dialog>
</template>
