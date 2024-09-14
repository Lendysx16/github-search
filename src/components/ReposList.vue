<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';

import repositoriy from '@/adapters/repository';

import ScrollBar from './ui/ScrollBar.vue';

type Props = {
  repos: repositoriy[];
  id: string;
};

const props = defineProps<Props>();

const currentElement = ref<null | HTMLElement>(null);

onMounted(() => {
  currentElement.value = document.getElementById(props.id);
});

watch(
  () => props.repos.length,
  () => {
    currentElement.value?.dispatchEvent(new Event('resize'));
  }
);
</script>

<template>
  <div class="repos_list__container">
    <scroll-bar
      v-if="currentElement && repos.length"
      class="repos_list__scroll-bar"
      :element="currentElement"
    />

    <transition-group
      :id="id"
      tag="ul"
      class="repos_list"
      name="list-items"
      move-class="list-items--move"
    >
      <li v-for="item in repos" :key="item.id">
        <github-repo-card :repo="item" v-on="$listeners" />
      </li>
    </transition-group>
  </div>
</template>

<style lang="scss">
@import '@/styles/transition-animate';

.repos_list {
  overflow-y: auto;
  height: calc(100svh - 120px);
  display: flex;
  gap: 20px;
  list-style: none;
  flex-direction: column;
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}

.repos_list__container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
