import { HttpService } from "@ribajs/core";
import type {
  PodloveWebPlayerEpisode,
  PodloveWebPlayerConfig,
} from "@podlove/types";

export const getEpisodeConfig = (episodeConfigUrl: string) => {
  return HttpService.getJSON<PodloveWebPlayerEpisode>(episodeConfigUrl);
};
export const getPlayerConfig = (playerConfigUrl: string) => {
  return HttpService.getJSON<PodloveWebPlayerConfig>(playerConfigUrl);
};
