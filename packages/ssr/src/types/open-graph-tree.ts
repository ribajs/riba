import { OpenGraph } from "./open-graph";
import { OpenGraphImage } from "./open-graph-image";
import { OpenGraphVideo } from "./open-graph-video";
import { OpenGraphAudio } from "./open-graph-audio";
import { OpenGraphLocale } from "./open-graph-locale";
import { OpenGraphBook } from "./open-graph-book";
import { OpenGraphProfile } from "./open-graph-profile";

export type OpenGraphTree =
  | OpenGraph
  | OpenGraphImage
  | OpenGraphVideo
  | OpenGraphAudio
  | OpenGraphLocale
  | OpenGraphBook
  | OpenGraphProfile;
