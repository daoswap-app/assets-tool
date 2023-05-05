<script setup lang="ts">
import { message } from "@/utils/message";
import useClipboard from "vue-clipboard3";
import { transformI18n } from "@/plugins/i18n";

const props = defineProps({
  text: {
    type: String,
    default: ""
  }
});

const { toClipboard } = useClipboard();

const handleCopy = async (text: string) => {
  try {
    await toClipboard(text);
    message(transformI18n("tip.copySuccess"), { type: "success" });
  } catch (e) {
    console.error(e);
  }
};
</script>

<template>
  <el-link
    type="primary"
    class="copy-button-text"
    :underline="false"
    @click="handleCopy(props.text)"
  >
    {{ props.text }}
  </el-link>
</template>

<style lang="scss" scoped>
.copy-button-text {
  word-wrap: break-word !important;
  word-break: break-all !important;
  white-space: normal !important;
  text-align: left !important;
}
</style>
