import { OpenGraphType } from "./open-graph-type";
import { OpenGraphDeterminer } from "./open-graph-determiner";
import { OpenGraphImage } from "./open-graph-image";
import { OpenGraphVideo } from "./open-graph-video";

export interface OpenGraph {
  // Basic
  title: string;
  type: OpenGraphType;
  image: string | string[] | OpenGraphImage | OpenGraphImage[];
  url: string;

  // Optional
  audio?: string;
  description?: string;
  determiner?: OpenGraphDeterminer;
  locale?: string;
  /** og:locale:alternate */
  localeAlternate?: string | string[];
  site_name?: string;
  video?: string | string[] | OpenGraphVideo | OpenGraphVideo[];

  // Audio
  /** Identical to og:audio. */
  audioUrl?: string;
  /** An alternate url to use if the webpage requires HTTPS. */
  audioSecure_url?: string;
  /** A MIME type for this audio. */
  audioType?: string;
}
