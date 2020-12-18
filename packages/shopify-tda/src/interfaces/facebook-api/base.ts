export interface FbPaging {
  cursors: {
    before: string;
    after: string;
  };
}

export interface IFbRequest<T> {
  data: T[];
  paging: FbPaging;
}
