export interface Repository {
  id: number;
  name: string;
  html_url: string;
  stargazers_count: string;
  watchers_count: string;
  forks_count: string;
  owner: {
    login: string;
  };
  latestCommit: string;
}