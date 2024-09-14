import { useGitHubApi } from '@/api/GithubApi';
import { defineStore } from 'pinia';
import { ref } from 'vue';

import repositoriy from '@/adapters/repository';
import repositoryDetail from '@/adapters/repositoryDetail';

export const useGitHubStore = defineStore('github', () => {
  const githubApi = useGitHubApi();

  const list = ref<repositoriy[]>([]);
  const item = ref<repositoryDetail | null>(null);

  const loadList = (params: { q: string }) => {
    return githubApi.loadList(params).then((response) => {
      list.value = response.data.items.map((raw) => new repositoriy(raw));
    });
  };

  const loadItem = (owner: string, repo: string) => {
    return githubApi.loadRepository(owner, repo).then((response) => {
      item.value = new repositoryDetail(response.data);
    });
  };

  const clearList = () => {
    list.value = [];
  };

  return {
    list,
    item,
    loadList,
    clearList,
    loadItem,
  };
});
