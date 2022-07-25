import type { InstagramPaging } from "./paging.js";

export interface InstagramData<T> {
  data: T;
  paging: InstagramPaging;
}
