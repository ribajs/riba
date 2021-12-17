import type { HttpError } from "./http-error";

export interface RenderError {
  hasError: true;
  error: HttpError | unknown;
}
