import { PodloveWebPlayerEpisode } from "./podlove-web-player-episode";
import { PodloveWebPlayerConfig } from "./podlove-web-player-config";

export interface PodloveWebPlayerComponentScope {
  episode?: PodloveWebPlayerEpisode;
  config?: PodloveWebPlayerConfig;
  episodeUrl: string;
  configUrl: string;
}
