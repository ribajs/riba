import { HttpError } from "./deps.ts";

export class HttpException extends HttpError {
  stack?: string;
  constructor(httpCode: number, message?: string, stack?: string[]) {
    super(httpCode, message);
    this.stack = stack ? stack.join("\n") : new Error().stack;
  }
}
