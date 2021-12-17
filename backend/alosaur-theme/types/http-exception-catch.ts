import { ErrorObj, HttpError, RenderResult } from "../deps.ts";

export interface HttpExceptionCatch {
  hasError: boolean;
  exception?: HttpError;
  /** Used if the error can be rendered on error page */
  renderResult?: RenderResult;
  overwriteException?: RenderResult | Error;
  status?: number;
  /** Used if the error can't be handled */
  errorObj?: ErrorObj;
}
