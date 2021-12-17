import type { HttpError } from "./http-error.ts";

export interface RenderError {
  hasError: true;
  error: HttpError;
}
