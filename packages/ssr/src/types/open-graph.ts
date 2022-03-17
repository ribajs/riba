import { OpenGraphType } from "./open-graph-type.js";
import { OpenGraphDeterminer } from "./open-graph-determiner.js";
import { OpenGraphImage } from "./open-graph-image.js";
import { OpenGraphVideo } from "./open-graph-video.js";
import { OpenGraphAudio } from "./open-graph-audio.js";
import { OpenGraphLocale } from "./open-graph-locale.js";
import { OpenGraphBook } from "./open-graph-book.js";
import { OpenGraphProfile } from "./open-graph-profile.js";

export interface OpenGraph {
  // Basic
  title: string;
  type: OpenGraphType;
  image: string | string[] | OpenGraphImage | OpenGraphImage[];
  url: string;

  // Optional
  audio?: string | string[] | OpenGraphAudio | OpenGraphAudio[];
  description?: string;
  determiner?: OpenGraphDeterminer;
  locale?: string | OpenGraphLocale | OpenGraphLocale[];
  site_name?: string;
  video?: string | string[] | OpenGraphVideo | OpenGraphVideo[];
  book?: OpenGraphBook;
  profile?: OpenGraphProfile;
}
