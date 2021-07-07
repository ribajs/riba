import { PodloveWebPlayerEpisode } from "./podlove-web-player-episode";
import { PodloveWebPlayerStore } from "./podlove-web-player-store";
declare global {
    interface Window {
        podlovePlayer?: (selector: string | Node, episode: string | PodloveWebPlayerEpisode, configuration: string | any) => Promise<PodloveWebPlayerStore>;
    }
}
