export interface OpenGraphImage {
  /** Identical to og:image. */
  url?: string;
  /** An alternate url to use if the webpage requires HTTPS. */
  secure_url?: string;
  /** A MIME type for this image. */
  type?: string;
  /** The number of pixels wide. */
  width?: number;
  /** The number of pixels high. */
  height?: number;
  /** A description of what is in the image (not a caption). If the page specifies an og:image it should specify og:image:alt. */
  alt?: string;
}
