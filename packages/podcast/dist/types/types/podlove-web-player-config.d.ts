import { PodloveWebPlayerPlaylistItem } from "./podlove-web-player-playlist-item";
import { PodloveWebPlayerSubscribeButton } from "./podlove-web-player-subscribe-button";
export interface PodloveWebPlayerConfig {
    version: 5;
    base: string;
    activeTab: string;
    theme: {
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
        fonts: {
            [key: string]: {
                name: string;
                family: string[];
                weight: number;
                src: string[];
            };
        };
    };
    "subscribe-button": PodloveWebPlayerSubscribeButton;
    playlist: PodloveWebPlayerPlaylistItem[];
    share: {
        channels: string[];
        outlet: string;
        sharePlaytime: true;
    };
}
