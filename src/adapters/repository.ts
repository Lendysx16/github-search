export default class repositoriy {
  id: number;
  stars: number;
  name: string;
  owner: string;
  fullName: string;
  forksCount: number;
  avatarUrl: string;

  constructor(raw) {
    this.id = raw.id;
    this.stars = raw.stargazers_count;
    this.name = raw.name;
    this.owner = raw.owner.login;
    this.fullName = raw.full_name;
    this.forksCount = raw.forks_count;
    this.avatarUrl = raw.owner.avatar_url;
  }
}
