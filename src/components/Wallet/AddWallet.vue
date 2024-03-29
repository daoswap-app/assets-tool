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
import Wallet_ABI from "@/assets/abi/Wallet_abi.json";
import { WALLET_CONTRACT_ADDRESSES, type WalletItem } from "@/config/constants";
import { getContractByABI } from "@/utils/web3";

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
  }
});
// 变量
const loading = ref<boolean>(false);
const formVisible = ref(false);
const currentWallet = ref<ConnectedWalletType>(null);
const web3 = ref<Web3Type>(null);
// 表单数据
type ownersType = {
  address: string;
  error: string;
};
type walletFormType = {
  name: string;
  owners: ownersType[];
  confirmNumber: number;
};

const emit = defineEmits(["update:visible", "refresh-wallet-list"]);

// 表单数据
const defalutFormValue = { name: "1rens", owners: [], confirmNumber: 1 };
const walletFormRef = ref<FormInstance>();
const walletForm = ref<walletFormType>(defalutFormValue);
onMounted(() => {
  loading.value = true;
  currentWallet.value = useWeb3ModalStoreHook().getWallet;
  web3.value = useWeb3ModalStoreHook().getWeb3;
  walletForm.value.owners.push({
    address: currentWallet.value.address,
    error: ""
  });
  loading.value = false;
});
// 方法
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
  // 校验所有者
  let errorNumber = 0;
  walletForm.value.owners.map((item: ownersType) => {
    if (!item.address) {
      errorNumber++;
      item.error = transformI18n("wallet.please add owners");
      return;
    } else {
      // 判断地址是否格式正确
      if (item.address) {
        item.address = checksumAddress(item.address);
        if (!isChecksummedAddress(item.address)) {
          errorNumber++;
          item.error = transformI18n("wallet.invalid wallet address");
          return;
        }
      }
      // 判断地址是否存在
      const exsitList = walletForm.value.owners.filter(
        (owner: ownersType) => owner.address === item.address
      );
      if (exsitList.length > 1) {
        const errorInfo = transformI18n("wallet.owner is already added");
        errorNumber++;
        item.error = errorInfo;
        exsitList.map((exist: ownersType) => {
          exist.error = errorInfo;
        });
        return;
      } else {
        errorNumber = errorNumber === 0 ? 0 : errorNumber--;
        item.error = "";
        return;
      }
    }
  });
  return errorNumber <= 0 && formValidRet;
};
// 创建钱包
const submitForm = async () => {
  const checkRet = await checkForm();
  if (checkRet) {
    loading.value = true;
    const owners = [];
    walletForm.value.owners.map((item: ownersType) => {
      owners.push(item.address);
    });
    // 调用合约
    const contract = getContractByABI(
      Wallet_ABI,
      WALLET_CONTRACT_ADDRESSES[currentWallet.value.chainId],
      web3.value
    );
    contract.methods
      .createWallet(
        walletForm.value.name,
        owners,
        walletForm.value.confirmNumber
      )
      .send({
        from: currentWallet.value.address
      })
      .then(() => {
        emit("refresh-wallet-list");
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
const removeOwner = (item: any) => {
  const index = walletForm.value.owners.indexOf(item);
  if (index !== -1) {
    walletForm.value.owners.splice(index, 1);
  }
};
const addOwner = () => {
  const newItem = {
    name: "",
    address: "",
    error: ""
  };
  walletForm.value.owners.push(newItem);
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
      walletForm.value.name = val.name;
      walletForm.value.confirmNumber = val.threshold;
      walletForm.value.owners = [];
      val.owners.map((owner: string) => {
        walletForm.value.owners.push({
          address: owner,
          error: ""
        });
      });
    } else {
      walletForm.value = defalutFormValue;
    }
    loading.value = false;
  }
);
watch(
  () => walletForm.value.owners.length,
  val => {
    if (walletForm.value.confirmNumber > walletForm.value.owners.length) {
      walletForm.value.confirmNumber = val;
    }
  }
);
</script>

<template>
  <el-dialog
    v-model="formVisible"
    :title="transformI18n('wallet.createWallet')"
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
        prop="name"
        :label="transformI18n('wallet.name')"
        style="width: 100%"
        :rules="[
          {
            required: true,
            message: transformI18n('wallet.please input wallet name'),
            trigger: 'blur'
          }
        ]"
      >
        <el-row :gutter="20" style="width: 100%">
          <el-col :span="24"><el-input v-model="walletForm.name" /></el-col>
        </el-row>
      </el-form-item>
      <el-form-item
        prop="owners"
        :label="transformI18n('wallet.owners')"
        style="width: 100%"
      >
        <el-form-item
          style="width: 100%; margin-bottom: 1.2rem"
          v-for="(owner, index) in walletForm.owners"
          :key="index"
          :error="owner.error"
        >
          <el-row :gutter="10" style="width: 100%">
            <el-col :xs="1" :md="1">{{ index + 1 }}</el-col>
            <el-col :xs="17" :md="19">
              <el-input v-model="owner.address" @blur="checkForm()" />
            </el-col>
            <el-col :xs="6" :md="4">
              <el-button v-if="index !== 0" @click.prevent="removeOwner(owner)"
                >删除</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addOwner">
          {{ transformI18n("wallet.btnAddOwner") }}
        </el-button>
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
                v-for="item in walletForm.owners.length"
                :key="item"
                :label="item"
                :value="item"
              />
            </el-select>
          </el-col>
          <el-col :xs="1" :md="1">/</el-col>
          <el-col :xs="8" :md="2">
            {{ walletForm.owners.length }}
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
