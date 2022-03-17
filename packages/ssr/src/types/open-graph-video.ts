import { OpenGraphVideoActor } from "./open-graph-video-actor.js";

export interface OpenGraphVideo {
  /** Identical to og:video. */
  url?: string;
  /** An alternate url to use if the webpage requires HTTPS. */
  secure_url?: string;
  /** A MIME type for this video. */
  type?: string;
  /** The number of pixels wide. */
  width?: number;
  /** The number of pixels high. */
  height?: number;
  /** A description of what is in the video (not a caption). If the page specifies an og:video it should specify og:video:alt. */
  alt?: string;
  /** profile array - Actors in the movie. */
  actor?: string | string[] | OpenGraphVideoActor | OpenGraphVideoActor[];
  /** profile array - Directors of the movie. */
  director?: string | string[];
  /** profile array - Writers of the movie. */
  writer?: string | string[];
  /** integer >=1 - The movie's length in seconds. */
  duration?: number;
  /** datetime - The date the movie was released. */
  release_date?: Date;
  /** string array - Tag words associated with this movie. */
  tag?: string | string[];
  /** video.tv_show - Which series this episode belongs to. */
  series?: string;
}
