import { PodloveWebPlayerEpisode } from "./podlove-web-player-episode";
import { PodloveWebPlayerConfig } from "./podlove-web-player-config";

export interface PodlovePlayButtonComponentScope {
  episode: string | PodloveWebPlayerEpisode;
  config: string | PodloveWebPlayerConfig;
  webPlayerId: string;
  playLabel: string;
  styles: {
    [key: string]: any
  },
  icons: {
    play: string;
  }
}
