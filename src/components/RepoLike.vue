<script setup lang="ts">
import likeLogo from '@/assets/like-logo.vue';

type Props = {
  isLiked: boolean;
};

defineProps<Props>();
</script>

<template>
  <like-logo
    :class="{
      'repo-like': !isLiked,
      'repo-like--liked': isLiked,
    }"
  />
</template>

<style lang="scss">
@use '@/styles/colors';

.repo-like {
  transform: scale(0.9);
  color: colors.$text-secondary;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1);
    color: colors.$red-100;
  }

  &--liked {
    transform: scale(1);
    color: colors.$red-100;
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: scale(0.9);
      color: colors.$text-secondary;
    }
  }

  @media screen and (max-width: 768px) {
    transform: scale(0.7);

    &:hover,
    &:active {
      transform: scale(0.7);
    }

    &--liked {
      transform: scale(0.7);
    }

    &--liked:hover,
    &--liked:active {
      transform: scale(0.7);
    }
  }
}
</style>
