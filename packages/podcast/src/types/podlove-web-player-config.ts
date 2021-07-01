import { PodloveWebPlayerPlaylistItem } from "./podlove-web-player-playlist-item";
import { PodloveWebPlayerSubscribeButton } from "./podlove-web-player-subscribe-button";

export interface PodloveWebPlayerConfig {
  version: 5;

  // player asset base path, falls back to ./
  base: string;

  activeTab: string; // default active tab, can be set to [chapters, files, share, playlist]

  theme: {
    /**
     * Tokens
     * - if defined the player defaults are dropped
     * - rgba as well as hex values are allowed
     * - use this generator to get a direct visual feedback:
     */
    tokens: {
      brand: string;
      brandDark: string;
      brandDarkest: string;
      brandLightest: string;
      shadeDark: string;
      shadeBase: string;
      contrast: string;
      alt: string;
    };

    /**
     * Fonts
     * - by default the system font stack is used (https://css-tricks.com/snippets/css/system-font-stack/)
     *
     * font:
     * - name: font name that is used in the font stack
     * - family: list of fonts in a fallback order
     * - weight: font weight of the defined font
     * - src: list of web font sources (allowed: woff, woff2, ttf, eot, svg)
     */
    fonts: {
      [key: string]: {
        name: string;
        family: string[];
        weight: number;
        src: string[];
      };
    };
  };

  /**
   * Subscribe Button
   * - configuration for the subscribe button overlay
   * - if not defined the subscribe button won't be rendered
   */
  "subscribe-button": PodloveWebPlayerSubscribeButton;

  /**
   * Playlist:
   * - can be a plain list or a reference to a json file
   * - if present playlist tab will be available
   */
  playlist: PodloveWebPlayerPlaylistItem[];

  /*
    Share Tab
  */
  share: {
    /**
     * Share Channels:
     * - list of available channels in share tab
     */
    channels: string[];
    // share outlet, if not provided embed snippet is not available
    outlet: string;
    sharePlaytime: true;
  };
}
