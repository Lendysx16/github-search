<script setup lang="ts">
import { computed } from 'vue';

import repositoriy from '@/adapters/repository';

import { useLikeStore } from '@/store/likeStore';

import forkLogo from '@/assets/fork-logo.vue';
import starLogo from '@/assets/star-logo.vue';

import RepoLike from '@/components/RepoLike.vue';

type Props = {
  repo: repositoriy;
};

type Emits = {
  (event: 'to-detail', repo: repositoriy): void;
};

const props = defineProps<Props>();
const emits = defineEmits<Emits>();

const likeStore = useLikeStore();

const isLiked = computed(() => likeStore.isLiked(props.repo.id));
</script>

<template>
  <div class="github-repo-card">
    <img :src="repo.avatarUrl" alt="img" class="github-repo-card__img" />
    <div class="github-repo-card__info">
      <h3>{{ repo.name }}</h3>
      <div class="github-repo-card__text-snd">
        <span>Stars: {{ repo.forksCount }}</span>

        <star-logo />
      </div>

      <div class="github-repo-card__text-snd">
        <span>Forks {{ repo.stars }}</span>

        <fork-logo />
      </div>
    </div>

    <span class="github-repo-card__link" @click="emits('to-detail', repo)">
      {{ repo.fullName }}</span
    >

    <div
      class="github-repo-card__like"
      @click="likeStore.handleLike(props.repo)"
    >
      <repo-like :isLiked="isLiked" />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/styles/colors';

.github-repo-card {
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 150px;
  max-height: 320px;
  width: 100%;
  border: 1px solid colors.$border;
  border-radius: 5px;
  background-color: colors.$second-bg;
  position: relative;
}

.github-repo-card__info {
  margin-top: 5px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;

  & h3 {
    grid-row: 1 / 3;
  }

  & span {
    text-align: end;
  }
}

.github-repo-card__img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-bottom: 20px;
}

.github-repo-card__text-snd {
  display: flex;
  justify-content: flex-end;
  align-items: end;
  gap: 5px;
  color: colors.$text-secondary;

  & :nth-child(2) {
    margin-top: 5px;
  }
}

.github-repo-card__link {
  width: 100%;
  color: colors.$text-link;
  border: 1px solid colors.$border;
  border-radius: 5px;
  padding: 7px 5px;
  margin-top: 20px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
}

.github-repo-card__like {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}
</style>
