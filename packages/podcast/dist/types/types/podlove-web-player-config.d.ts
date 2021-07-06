import { PodloveWebPlayerPlaylistItem } from "./podlove-web-player-playlist-item";
import { PodloveWebPlayerSubscribeButton } from "./podlove-web-player-subscribe-button";
import { PodloveWebPlayerShare } from "./podlove-web-player-share";
import { PodloveWebPlayerTheme } from "./podlove-web-player-theme";
export interface PodloveWebPlayerConfig {
    version: 5;
    base: string;
    activeTab?: "none" | "shownotes" | "chapters" | "files" | "share" | "playlist";
    theme: PodloveWebPlayerTheme;
    "subscribe-button"?: PodloveWebPlayerSubscribeButton;
    playlist?: PodloveWebPlayerPlaylistItem[];
    share?: PodloveWebPlayerShare;
}
