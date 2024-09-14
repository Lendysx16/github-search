<script setup lang="ts">
import { onUnmounted, ref } from 'vue';

import { copyToClipboard } from '@/utils/copy';

type Props = {
  textToCopy: string;
};

const props = defineProps<Props>();

const copyText = ref('Copy');
let timeout = 0;

const copyValue = () => {
  copyToClipboard(props.textToCopy);

  copyText.value = 'Copied!';

  clearTimeout(timeout);
  timeout = setTimeout(() => {
    copyText.value = 'Copy';
  }, 1000);
};

onUnmounted(() => {
  clearTimeout(timeout);
});
</script>

<template>
  <div class="copy" @click="copyValue">
    <slot>
      <button class="copy__button">{{ copyText }}</button>
    </slot>
  </div>
</template>

<style lang="scss">
@use '@/styles/colors';

.copy {
  width: 100%;
}

.copy__button {
  padding: 10px;
  border: 1px solid colors.$border;
  border-radius: 5px;
  width: 100%;
  background: colors.$primary;
  transition: border-color 0.2s ease-in-out;
  color: colors.$text;

  &:hover {
    background: colors.$border;
  }

  &:focus {
    outline: none;
    border-color: colors.$accent;
  }
}
</style>
