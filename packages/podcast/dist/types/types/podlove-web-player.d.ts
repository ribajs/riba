import { PodloveWebPlayerEpisode } from "./podlove-web-player-episode.js";
import { PodloveWebPlayerStore } from "./podlove-web-player-store.js";
declare global {
    interface Window {
        podlovePlayer?: (selector: string | Node, episode: string | PodloveWebPlayerEpisode, configuration: string | any) => Promise<PodloveWebPlayerStore>;
    }
}
