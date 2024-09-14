import repositoriy from '@/adapters/repository';

export default class repositoryDetail extends repositoriy {
  description: string;
  language: string;
  createdAt: Date;
  pushedAt: Date;

  constructor(raw) {
    super(raw);

    this.description = raw.description || '';
    this.language = raw.language || '';
    this.createdAt = new Date(raw.created_at);
    this.pushedAt = new Date(raw.pushed_at);
  }
}
