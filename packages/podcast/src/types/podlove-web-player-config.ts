import { PodloveWebPlayerPlaylistItem } from "./podlove-web-player-playlist-item.js";
import { PodloveWebPlayerSubscribeButton } from "./podlove-web-player-subscribe-button.js";
import { PodloveWebPlayerShare } from "./podlove-web-player-share.js";
import { PodloveWebPlayerTheme } from "./podlove-web-player-theme.js";
import { PodloveWebPlayerTab } from "./podlove-web-player-tab.js";

export interface PodloveWebPlayerConfig {
  version: 5;

  /** player asset base path, falls back to ./ */
  base: string;

  /** default active tab, can be set to [none, shownotes, chapters, files, share, playlist] */
  activeTab?: PodloveWebPlayerTab;

  theme: PodloveWebPlayerTheme;

  /**
   * Subscribe Button
   * - configuration for the subscribe button overlay
   * - if not defined the subscribe button won't be rendered
   */
  "subscribe-button"?: PodloveWebPlayerSubscribeButton;

  /**
   * Playlist:
   * - can be a plain list or a reference to a json file
   * - if present playlist tab will be available
   */
  playlist?: PodloveWebPlayerPlaylistItem[];

  /** Share Tab */
  share?: PodloveWebPlayerShare;
}
