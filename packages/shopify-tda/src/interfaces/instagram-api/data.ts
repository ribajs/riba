import type { InstagramPaging } from "./paging";

export interface InstagramData<T> {
  data: T;
  paging: InstagramPaging;
}
