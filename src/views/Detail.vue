<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router/composables';

import { getFormatedDate } from '@/utils/formatDate';

import { useGitHubStore } from '@/store/githubStore';
import { useLikeStore } from '@/store/likeStore';

import forkLogo from '@/assets/fork-logo.vue';
import starLogo from '@/assets/star-logo.vue';

const route = useRoute();
const router = useRouter();

const githubStore = useGitHubStore();
const likeStore = useLikeStore();

const isLoading = ref(true);
const isError = ref(false);

const isLiked = computed(() =>
  githubStore.item ? likeStore.isLiked(githubStore.item.id) : false
);

onMounted(() => {
  const { owner, repo } = route.params;

  githubStore
    .loadItem(owner, repo)
    .catch(() => {
      isError.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
});

const handleBack = () => {
  if (router['previousRoute']) {
    router.back();
  } else {
    router.push({ name: 'home' });
  }
};
</script>

<template>
  <div class="detail">
    <div v-if="isLoading">Loading...</div>
    <div v-else-if="isError">Error</div>
    <div v-else-if="githubStore.item" class="detail__info">
      <div class="detail__info-main">
        <img
          class="detail__info-img"
          :src="githubStore.item.avatarUrl"
          alt="img"
        />
        <h1>{{ githubStore.item.name }}</h1>
      </div>

      <span v-if="githubStore.item.description" class="detail__info-desc">
        {{ githubStore.item.description }}</span
      >

      <div class="detail__info-desc-stats">
        <span>Stars: {{ githubStore.item.forksCount }}</span>

        <star-logo />
      </div>

      <div class="detail__info-desc-stats">
        <span>Forks {{ githubStore.item.stars }}</span>

        <fork-logo />
      </div>

      <span class="detail__info-desc">
        Created: {{ getFormatedDate(githubStore.item.createdAt) }}
      </span>

      <span class="detail__info-desc">
        Last updated: {{ getFormatedDate(githubStore.item.pushedAt) }}
      </span>

      <span v-if="githubStore.item.language" class="detail__info-desc-lang">
        {{ githubStore.item.language }}
      </span>

      <div
        class="detail__info-like"
        @click="likeStore.handleLike(githubStore.item)"
      >
        <repo-like :is-liked="isLiked" />
      </div>
    </div>

    <div class="detail__back" @click="handleBack">Back</div>
  </div>
</template>

<style lang="scss">
@use '@/styles/colors';

.detail {
  position: relative;
  padding: 20px;
  width: 80%;
  margin: auto;
  min-height: 100svh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.detail__back {
  position: absolute;
  padding: 15px;
  top: 40px;
  left: -40px;
  cursor: pointer;
}

.detail__info {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 50px;
  border: 1px solid colors.$border;
  border-radius: 10px;
  position: relative;
}

.detail__info-main {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.detail__info-img {
  width: 150px;
  height: 150px;
  border-radius: 50%;
}

.detail__info-desc {
  color: colors.$text-secondary;
  text-align: justify;
  overflow: hidden;
  max-height: 320px;
}

.detail__info-desc-stats {
  display: flex;
  color: colors.$text-secondary;
  align-items: center;
  gap: 5px;
}

.detail__info-desc-lang {
  color: colors.$text-secondary;
  text-align: end;
  position: relative;
  margin-top: 10px;

  &::before {
    content: '';
    width: 100%;
    height: 1px;
    background-color: colors.$border;
    position: absolute;
    top: -15px;
    left: 0;
  }
}

.detail__info-like {
  position: absolute;
  top: 30px;
  right: 30px;
}
</style>
