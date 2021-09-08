import { PodloveWebPlayerEpisode } from "./podlove-web-player-episode";
import { PodloveWebPlayerConfig } from "./podlove-web-player-config";
export interface PodloveWebPlayerComponentScope {
    episode: string | PodloveWebPlayerEpisode;
    config: string | PodloveWebPlayerConfig;
}
