import { OpenGraphType } from "./open-graph-type";
import { OpenGraphDeterminer } from "./open-graph-determiner";
import { OpenGraphImage } from "./open-graph-image";
import { OpenGraphVideo } from "./open-graph-video";
import { OpenGraphAudio } from "./open-graph-audio";
import { OpenGraphLocale } from "./open-graph-locale";
import { OpenGraphBook } from "./open-graph-book";
import { OpenGraphProfile } from "./open-graph-profile";

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
