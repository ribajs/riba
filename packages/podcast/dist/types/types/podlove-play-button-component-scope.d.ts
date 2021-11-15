import type { PodloveWebPlayerEpisode, PodloveWebPlayerConfig } from "@podlove/types";
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
    error?: unknown;
}
