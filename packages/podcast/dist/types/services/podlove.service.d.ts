import type { PodloveWebPlayerEpisode } from "../types/podlove-web-player-episode";
import type { PodloveWebPlayerConfig } from "../types/podlove-web-player-config";
export declare class PodloveService {
    static getEpisodeConfig(episodeConfigUrl: string): Promise<import("@ribajs/core").HttpServiceResponse<PodloveWebPlayerEpisode>>;
    static getPlayerConfig(playerConfigUrl: string): Promise<import("@ribajs/core").HttpServiceResponse<PodloveWebPlayerConfig>>;
}
