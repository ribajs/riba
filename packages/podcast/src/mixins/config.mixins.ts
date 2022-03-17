import { HttpService } from "@ribajs/core";
import type { PodloveWebPlayerEpisode } from "../types/podlove-web-player-episode.js";
import type { PodloveWebPlayerConfig } from "../types/podlove-web-player-config.js";

export const getEpisodeConfig = (episodeConfigUrl: string) => {
  return HttpService.getJSON<PodloveWebPlayerEpisode>(episodeConfigUrl);
};
export const getPlayerConfig = (playerConfigUrl: string) => {
  return HttpService.getJSON<PodloveWebPlayerConfig>(playerConfigUrl);
};
