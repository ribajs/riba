export interface HttpServiceResponse<T> {
  status: Response["status"];
  headers: Response["headers"];
  ok: Response["ok"];
  redirected: Response["redirected"];
  statusText: Response["statusText"];
  trailer: Response["trailer"];
  type: Response["type"];
  url: Response["url"];
  arrayBuffer: Response["arrayBuffer"];
  blob: Response["blob"];
  bodyUsed: Response["bodyUsed"];
  clone: Response["clone"];
  formData: Response["formData"];
  text: Response["text"];
  body: T;
}
