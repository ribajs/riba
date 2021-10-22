import type { PodloveWebPlayerEpisode } from "./podlove-web-player-episode";
import type { PodloveWebPlayerConfig } from "./podlove-web-player-config";
import type { PodlovePlayButtonComponent } from "../components/podlove-play-button/podlove-play-button.component";

export interface PodlovePlayButtonComponentScope {
  episode?: PodloveWebPlayerEpisode;
  config?: PodloveWebPlayerConfig;
  episodeUrl: string;
  configUrl: string;
  webPlayerId: string;
  playLabel: string;
  styles: {
    [key: string]: any;
  };
  icons: {
    play: string;
  };
  play: PodlovePlayButtonComponent["play"];
}
