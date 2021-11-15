import { HttpService } from "@ribajs/core";
import type {
  PodloveWebPlayerEpisode,
  PodloveWebPlayerConfig,
} from "@podlove/types";

export class PodloveService {
  static getEpisodeConfig(episodeConfigUrl: string) {
    return HttpService.getJSON<PodloveWebPlayerEpisode>(episodeConfigUrl);
  }
  static getPlayerConfig(playerConfigUrl: string) {
    return HttpService.getJSON<PodloveWebPlayerConfig>(playerConfigUrl);
  }
}
