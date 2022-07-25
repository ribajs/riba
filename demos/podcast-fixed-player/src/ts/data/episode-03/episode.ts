import { PodloveWebPlayerEpisode } from "@ribajs/podcast";

import { chapters } from "./chapters.js";
import { transcripts } from "./transcripts.js";
import {
  alexanderHeimbuch,
  michaelaLehr,
  ericTeubert,
  simon,
} from "../contributors/index.js";
import { show } from "../show.js";

/**
 * Epsiode Meta Information
 */

export const episode03: PodloveWebPlayerEpisode = {
  // Configuration Version
  version: 5,

  /**
   * Show Related Information
   */
  show,

  /**
   * Episode related Information
   */
  title: "Podlove Web Player",
  subtitle: "Podlove Web Player: Motivation, Geschichte, Features, Ausblick",
  summary:
    "Wir holen uns Simon zur Hilfe um \u00fcber die Anf\u00e4nge des Podlove Web Player zu sprechen: Warum es ihn gibt und wie die ersten Versionen aussahen. In der zweiten H\u00e4lfte geht es tief in den Technik-Kaninchenbau: Alex erl\u00e4utert seine Motivation f\u00fcr den Neubau f\u00fcr Podlove Web Player 4 und 5. Zum Schluss besprechen wir das holprige Release des aktuellen Web Player Plugins.",
  // ISO 8601 DateTime format, this is capable of adding a time offset, see https://en.wikipedia.org/wiki/ISO_8601
  publicationDate: "2020-08-16T11:58:58+00:00",
  poster: "/assets/episode.png",
  // ISO 8601 Duration format ([hh]:[mm]:[ss].[sss]), capable of add ing milliseconds, see https://en.wikipedia.org/wiki/ISO_8601
  duration: "01:31:18.610",
  link: "https://podlovers.org/podlove-web-player",
  /**
   * Audio Assets
   * - media Assets played by the audio player
   * - format support depends on the used browser (https://en.wikipedia.org/wiki/HTML5_audio#Supported_audio_coding_formats)
   * - also supports HLS streams
   *
   * Asset
   * - url: absolute path to media asset
   * - size: file size in  byte
   * - (title): title to be displayed in download tab
   * - mimeType: media asset mimeType
   */
  audio: [
    {
      url: "https://files.podlovers.org/LOV003.mp3",
      size: "76976929",
      title: "MP3 Audio (mp3)",
      mimeType: "audio/mpeg",
    },
  ],

  /**
   * Files
   * - list of files available for download
   * - if no files are present, audio assets will be used as downloads
   *
   * Asset
   * - url: absolute path to media asset
   * - size: file size in  byte
   * - title: title to be displayed in download tab
   * - (mimeType): media asset mimeType
   */
  files: [
    {
      url: "https://files.podlovers.org/LOV003.mp3",
      size: "76976929",
      title: "MP3 Audio",
      mimeType: "audio/mpeg",
    },
    {
      url: "https://files.podlovers.org/LOV003.vtt",
      size: "108401",
      title: "Transkripte",
      mimeType: "text/plain",
    },
  ],

  /**
   * Chapters:
   * - can be a plain list or a reference to a json file
   * - if present chapters tab will be available
   */
  chapters,

  /**
   * Contributors
   * - used by info and transcripts tab
   *
   * Contributor
   * - id: used as a reference in transcripts
   * - name: name of the contributor
   * - (avatar): avatar of the contributor
   * - (group): contributors group
   */
  contributors: [alexanderHeimbuch, michaelaLehr, ericTeubert, simon],

  /**
   * Transcripts:
   * - can be a plain list or a reference to a json file
   * - if present transcripts tab will be available
   */
  transcripts,
};
