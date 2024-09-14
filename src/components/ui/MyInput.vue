<script setup lang="ts">
type Props = {
  value: string;
  placeholder?: string;
};

type Emits = {
  (event: 'input', value): boolean;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emits('input', target.value);
};
</script>

<template>
  <input v-bind="props" type="text" class="my-input" @input="handleInput" />
</template>

<style lang="scss" scoped>
@use '@/styles/colors';

.my-input {
  padding: 10px;
  border: 1px solid colors.$border;
  border-radius: 5px;
  width: 100%;
  background: colors.$primary;
  transition: border-color 0.2s ease-in-out;
  color: colors.$text;

  &:focus {
    outline: none;
    border-color: colors.$accent;
  }
}
</style>
