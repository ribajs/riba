import { InstagramMedia } from "./media";

export interface InstagramResponse {
  id: string;
  media: InstagramMedia;
  media_count: number;
}
