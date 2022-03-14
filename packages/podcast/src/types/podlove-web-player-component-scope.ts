import { PodloveWebPlayerEpisode } from "./podlove-web-player-episode.js";
import { PodloveWebPlayerConfig } from "./podlove-web-player-config.js";

export interface PodloveWebPlayerComponentScope {
  episode?: PodloveWebPlayerEpisode;
  config?: PodloveWebPlayerConfig;
  episodeUrl: string;
  configUrl: string;
}
