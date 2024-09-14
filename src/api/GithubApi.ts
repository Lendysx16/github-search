import Axios from 'axios';
import { Dictionary } from 'vue-router/types/router';

const API_URL = 'https://api.github.com';

export default class GitHubApi {
  private api = Axios.create({
    baseURL: API_URL,
    headers: {
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  });

  loadList(params: Dictionary<string>) {
    return this.api.get('/search/repositories', { params });
  }

  loadRepository(owner: string, repo: string) {
    return this.api.get(`/repos/${owner}/${repo}`);
  }
}

export const useGitHubApi = () => new GitHubApi();
