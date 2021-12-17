export class HttpException extends Error {
  stack?: string;
  httpCode: number;
  constructor(httpCode: number, message?: string, stack?: string[]) {
    super(message);
    this.httpCode = httpCode;
    this.stack = stack ? stack.join("\n") : new Error().stack;
  }
}
