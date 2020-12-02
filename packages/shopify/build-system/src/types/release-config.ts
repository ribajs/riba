export interface ReleaseConfig {
  bitbucket?: {
    username: string;
    password: string;
    workspace: string;
    repo_slug: string;
  };
  github?: {
    org?: string;
    owner?: string;
    password: string;
    type: string;
    repo: string;
  };
}
