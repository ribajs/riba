import type { InstagramPaging } from './paging';

export interface InstagramResponse<T> {
  data: T;
  paging: InstagramPaging;
}
