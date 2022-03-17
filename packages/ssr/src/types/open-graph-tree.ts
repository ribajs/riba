import { OpenGraph } from "./open-graph.js";
import { OpenGraphImage } from "./open-graph-image.js";
import { OpenGraphVideo } from "./open-graph-video.js";
import { OpenGraphAudio } from "./open-graph-audio.js";
import { OpenGraphLocale } from "./open-graph-locale.js";
import { OpenGraphBook } from "./open-graph-book.js";
import { OpenGraphProfile } from "./open-graph-profile.js";

export type OpenGraphTree =
  | OpenGraph
  | OpenGraphImage
  | OpenGraphVideo
  | OpenGraphAudio
  | OpenGraphLocale
  | OpenGraphBook
  | OpenGraphProfile;
