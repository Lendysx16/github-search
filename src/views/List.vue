<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router/composables';

import { useDebounce } from '@/utils/debounse';

import { useGitHubStore } from '@/store/githubStore';
import { useLikeStore } from '@/store/likeStore';

import Copy from '@/components/Copy.vue';
import ReposList from '@/components/ReposList.vue';

const route = useRoute();
const router = useRouter();

const githubStore = useGitHubStore();
const likeStore = useLikeStore();

const isLoading = ref(true);
const isError = ref(false);

const searchParam = ref(
  (Array.isArray(route.query['q']) ? route.query['q'][0] : route.query['q']) ||
    ''
);

const handleSearch = () => {
  isLoading.value = true;

  return githubStore
    .loadList({ q: searchParam.value })
    .then(() => {
      isError.value = false;
      if (searchParam.value !== route.query['q'])
        router.push({ query: { q: searchParam.value } });
    })
    .catch(() => {
      isError.value = true;
    })
    .finally(() => {
      isLoading.value = false;
    });
};

const debounsedSearch = useDebounce(handleSearch, 1000);

const toDetail = (repo) => {
  router.push({
    name: 'detail',
    params: { owner: repo.owner, repo: repo.name },
  });
};

watch(
  () => searchParam.value,
  (oldValue, newValue) => {
    if (oldValue === newValue) {
      return;
    }

    if (!searchParam.value.trim()) {
      isLoading.value = false;
      githubStore.clearList();
      return;
    }

    debounsedSearch();
  },
  { immediate: true }
);
</script>

<template>
  <div class="list__container">
    <div class="list__searcher">
      <div class="list__searcher-input">
        <my-input v-model="searchParam" />
        <copy :text-to-copy="searchParam" />
      </div>

      <span v-if="isLoading" style="font-weight: bold; text-align: center">
        Loading...
      </span>

      <span v-else-if="isError" style="font-weight: bold; text-align: center">
        Error occured
      </span>
      <repos-list
        v-else
        :id="'searchList'"
        :repos="githubStore.list"
        @to-detail="toDetail"
      />
    </div>

    <div class="list__searcher">
      <h3 class="list__searcher-likes-header">
        {{
          likeStore.likedRepositories.length ? 'Liked repos' : 'No repos liked'
        }}
      </h3>

      <repos-list
        :id="'likedList'"
        :repos="likeStore.likedRepositories"
        @to-detail="toDetail"
      />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/styles/colors';

.list__container {
  display: flex;
  justify-content: space-between;
  padding: 20px;
  width: 80%;
  margin: auto;

  @media screen and (max-width: 768px) {
    width: 95%;
  }
}

.list__searcher-input {
  margin-bottom: 20px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 10px;

  & input {
    grid-column: 1 / 4;
  }

  @media screen and (max-width: 768px) {
    grid-template-rows: 1fr 1fr;

    & input {
      grid-column: 1 / 5;
    }

    & div {
      grid-column: 1 / 5;
    }
  }
}

.list__searcher-likes-header {
  height: 44px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  @media screen and (max-width: 768px) {
    height: 80px;
    margin-bottom: 23px;
  }
}

.list__searcher {
  width: 45%;

  @media screen and (max-width: 768px) {
    width: 48%;
  }
}
</style>
