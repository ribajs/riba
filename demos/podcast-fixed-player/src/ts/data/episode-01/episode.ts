import type { PodloveWebPlayerEpisode } from "@ribajs/podcast";
import { chapters } from "./chapters.js";
import { transcripts } from "./transcripts.js";
import {
  alexanderHeimbuch,
  michaelaLehr,
  ericTeubert,
} from "../contributors/index.js";
import { show } from "../show.js";

export const episode01: PodloveWebPlayerEpisode = {
  version: 5,
  /**
   * Show Related Information
   */
  show,
  title: "Wir. Müssen Reden",
  subtitle: "Die Podlove Entwickler:innen stellen sich vor.",
  summary:
    "Lange war es still im Podlove Projekt, das soll sich jetzt ändern! In dieser Episode versuchen wir uns zunächst an einer Definition von Podlove und stellen die drei Projekte Podlove Publisher, Podlove Web Player sowie Podlove Subscribe Button vor. Zentral geht es aber eigentlich um die Entwickler:innen: Wer wir sind, wie wir in das Projekt gekommen sind, was uns motiviert und wie wir mit Podlove weiter machen wollen.",
  publicationDate: "2020-07-15T15:37:32+00:00",
  duration: "00:50:03.900",
  poster:
    "https://backend.podlovers.org/wp-content/cache/podlove/8c/b68ab69fc23b3e57cdcdbd70f87f08/wir-muessen-reden_500x.png",
  link: "https://backend.podlovers.org/wir-mussen-reden/",
  chapters,
  audio: [
    {
      url: "https://backend.podlovers.org/podlove/file/1/s/webplayer/c/website/LOV001.mp3",
      size: "42338033",
      title: "MP3 Audio (mp3)",
      mimeType: "audio/mpeg",
    },
  ],
  files: [
    {
      url: "https://backend.podlovers.org/podlove/file/1/s/webplayer/LOV001.mp3",
      size: "42338033",
      title: "MP3 Audio",
      mimeType: "audio/mpeg",
    },
  ],
  contributors: [alexanderHeimbuch, michaelaLehr, ericTeubert],
  transcripts,
};
