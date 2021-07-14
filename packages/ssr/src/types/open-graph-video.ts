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
}
