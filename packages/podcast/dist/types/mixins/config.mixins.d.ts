import type { PodloveWebPlayerEpisode, PodloveWebPlayerConfig } from "@podlove/types";
export declare const getEpisodeConfig: (episodeConfigUrl: string) => Promise<import("@ribajs/core").HttpServiceResponse<PodloveWebPlayerEpisode>>;
export declare const getPlayerConfig: (playerConfigUrl: string) => Promise<import("@ribajs/core").HttpServiceResponse<PodloveWebPlayerConfig>>;
