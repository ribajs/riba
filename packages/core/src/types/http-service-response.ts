export interface HttpServiceResponse<T> {
  status: number;
  body: T;
}
