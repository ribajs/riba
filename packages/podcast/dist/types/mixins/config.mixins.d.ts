import type { PodloveWebPlayerEpisode } from "../types/podlove-web-player-episode";
import type { PodloveWebPlayerConfig } from "../types/podlove-web-player-config";
export declare const getEpisodeConfig: (episodeConfigUrl: string) => Promise<import("@ribajs/core/src/index.js").HttpServiceResponse<PodloveWebPlayerEpisode>>;
export declare const getPlayerConfig: (playerConfigUrl: string) => Promise<import("@ribajs/core/src/index.js").HttpServiceResponse<PodloveWebPlayerConfig>>;
