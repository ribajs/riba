import { InstagramMedia } from "./media.js";

export interface InstagramMediaResponse {
  id: string;
  media: InstagramMedia;
  media_count: number;
}
