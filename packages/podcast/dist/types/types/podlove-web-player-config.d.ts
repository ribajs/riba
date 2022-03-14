import { PodloveWebPlayerPlaylistItem } from "./podlove-web-player-playlist-item.js";
import { PodloveWebPlayerSubscribeButton } from "./podlove-web-player-subscribe-button.js";
import { PodloveWebPlayerShare } from "./podlove-web-player-share.js";
import { PodloveWebPlayerTheme } from "./podlove-web-player-theme.js";
import { PodloveWebPlayerTab } from "./podlove-web-player-tab.js";
export interface PodloveWebPlayerConfig {
    version: 5;
    base: string;
    activeTab?: PodloveWebPlayerTab;
    theme: PodloveWebPlayerTheme;
    "subscribe-button"?: PodloveWebPlayerSubscribeButton;
    playlist?: PodloveWebPlayerPlaylistItem[];
    share?: PodloveWebPlayerShare;
}
