export interface ReleaseConfig {
  bitbucket?: {
    username: string;
    password: string;
    workspace: string;
    repo_slug: string;
  };
  github?: {
    token: string;
    org?: string;
    owner?: string;
    type: string;
    repo: string;
  };
}
