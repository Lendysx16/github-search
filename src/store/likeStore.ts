import { defineStore } from 'pinia';
import { ref } from 'vue';

import repositoriy from '@/adapters/repository';

export const useLikeStore = defineStore(
  'like',
  () => {
    const likedRepositories = ref<repositoriy[]>([]);

    const isLiked = (id: number) => {
      return likedRepositories.value.findIndex((repo) => repo.id === id) !== -1;
    };

    const handleLike = (repo: repositoriy) => {
      if (isLiked(repo.id)) {
        likedRepositories.value = likedRepositories.value.filter(
          ({ id }) => id !== repo.id
        );
      } else {
        likedRepositories.value.push(repo);
      }
    };

    return {
      likedRepositories,
      isLiked,
      handleLike,
    };
  },
  { persist: true }
);
