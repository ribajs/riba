import {
  PodloveWebPlayerEpisode,
  PodloveWebPlayerConfig,
} from "@podlove/types";

export interface PodloveWebPlayerComponentScope {
  episode?: PodloveWebPlayerEpisode;
  config?: PodloveWebPlayerConfig;
  episodeUrl: string;
  configUrl: string;
}
