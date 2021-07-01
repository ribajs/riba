import type { Store } from "@reduxjs/toolkit";
import { PodloveWebPlayerEpisode } from "./podlove-web-player-episode";
declare global {
    interface Window {
        podlovePlayer?: (selector: string | Node, episode: string | PodloveWebPlayerEpisode, configuration: string | any) => Promise<Store>;
    }
}
