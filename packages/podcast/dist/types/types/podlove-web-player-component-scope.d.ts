import { PodloveWebPlayerEpisode } from "./podlove-web-player-episode";
import { PodloveWebPlayerConfig } from "./podlove-web-player-config";
export interface PodloveWebPlayerComponentScope {
    selector: string;
    episode: string | PodloveWebPlayerEpisode;
    config: string | PodloveWebPlayerConfig;
}
