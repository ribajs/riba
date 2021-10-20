import { HttpService } from "@ribajs/core";
import type { PodloveWebPlayerEpisode } from "../types/podlove-web-player-episode";
import type { PodloveWebPlayerConfig } from "../types/podlove-web-player-config";

export class PodloveService {
  static getEpisodeConfig(episodeConfigUrl: string) {
    return HttpService.getJSON<PodloveWebPlayerEpisode>(episodeConfigUrl);
  }
  static getPlayerConfig(playerConfigUrl: string) {
    return HttpService.getJSON<PodloveWebPlayerConfig>(playerConfigUrl);
  }
}