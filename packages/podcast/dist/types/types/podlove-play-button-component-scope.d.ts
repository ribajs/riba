import type { PodloveWebPlayerEpisode } from "./podlove-web-player-episode.js";
import type { PodloveWebPlayerConfig } from "./podlove-web-player-config.js";
import type { PodlovePlayButtonComponent } from "../components/podlove-play-button/podlove-play-button.component.js";
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
    error?: unknown;
}
