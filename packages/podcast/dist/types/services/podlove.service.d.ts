import type { PodloveWebPlayerEpisode, PodloveWebPlayerConfig } from "@podlove/types";
export declare class PodloveService {
    static getEpisodeConfig(episodeConfigUrl: string): Promise<import("@ribajs/core").HttpServiceResponse<PodloveWebPlayerEpisode>>;
    static getPlayerConfig(playerConfigUrl: string): Promise<import("@ribajs/core").HttpServiceResponse<PodloveWebPlayerConfig>>;
}
