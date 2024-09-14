<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

import { useDebounce } from '@/utils/debounse';

type Props = {
  element: HTMLElement;
};

const props = defineProps<Props>();

const progressValue = ref(0);

const currentPosition = ref(props.element.scrollTop || 0);
const viewportHeight = ref(props.element.clientHeight || 0);
const pageHeight = ref(props.element.scrollHeight || 0);

onMounted(() => {
  props.element.addEventListener('scroll', debousedCalc);

  props.element.addEventListener('resize', debousedCalc);

  calcScrollPosition();
});

onUnmounted(() => {
  props.element.removeEventListener('scroll', debousedCalc);

  props.element.removeEventListener('resize', debousedCalc);
});

const calcScrollPosition = () => {
  currentPosition.value = props.element.scrollTop;
  viewportHeight.value = props.element.clientHeight;
  pageHeight.value = props.element.scrollHeight;

  progressValue.value =
    (currentPosition.value / (pageHeight.value - viewportHeight.value)) * 100;

  if (isNaN(progressValue.value)) {
    progressValue.value = 100;
  }
};

const debousedCalc = useDebounce(calcScrollPosition, 50);
</script>

<template>
  <progress
    :value="progressValue"
    max="100"
    :class="{
      'scroll-bar': true,
      'scroll-bar--hidden': viewportHeight >= pageHeight,
    }"
  />
</template>

<style lang="scss" scoped>
@use '@/styles/colors';

.scroll-bar {
  background-color: colors.$text;
  width: 100%;
  border-radius: 10px;
  border: none;
  height: 5px;
  opacity: 0.5;

  &::-moz-progress-bar {
    background-color: colors.$red-100;
  }

  &--hidden {
    opacity: 0;
  }
}
</style>
