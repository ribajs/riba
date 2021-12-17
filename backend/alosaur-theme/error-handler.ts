import {
  ConsoleMessage,
  HttpError,
  RenderError,
  SsrHttpError,
} from "./deps.ts";
import { ResponseError } from "./types/index.ts";
import { HttpException } from "./http-exception.ts";

/**
 * @param exception
 * @returns
 */
export const getStatus = (
  exception: ResponseError | HttpException | string,
): number => {
  let status = 500;
  if (typeof exception !== "string") {
    status = (exception as ResponseError).status ||
      (exception as HttpException).httpCode || status;
  }
  return status;
};

export const getMessage = (
  exception: HttpError | SsrHttpError | ResponseError | string,
  messages: ConsoleMessage[] = [],
): string => {
  let message = "Internal server error";

  if (typeof exception === "string") {
    message = exception;
  } else if (exception.message) {
    message = exception.message || message;
  }

  const errorMessages = messages
    .filter((message) => message.type === "error" || message.type === "warn")
    .map((log) => JSON.stringify(log))
    .join("\n");

  if (errorMessages) {
    message += "\n" + errorMessages;
  }

  return message;
};

export const getStack = (
  exception: HttpError | SsrHttpError | ResponseError | string,
): string[] => {
  let stack: string | string[] | undefined;
  if (typeof exception === "string") {
    stack = new Error(exception).stack;
    return stack?.split("\n") || [];
  }

  if (!stack) {
    stack = exception.stack;
  }

  if (!stack) {
    stack = new Error().stack;
  }

  if (Array.isArray(stack)) {
    return stack;
  }

  return stack?.split("\n") || [];
};

export const handleError = (
  _error: HttpError | SsrHttpError | ResponseError | string | RenderError,
  messages: ConsoleMessage[] = [],
): HttpError => {
  if (_error instanceof HttpError) {
    return _error;
  }

  let error: HttpError | SsrHttpError | ResponseError | string;

  if ((_error as RenderError).hasError) {
    error = (_error as RenderError).error;
  } else {
    error = _error as HttpError | SsrHttpError | ResponseError | string;
  }

  try {
    const httpError = new HttpException(
      getStatus(error),
      getMessage(error, messages),
      getStack(error),
    );
    return httpError;
  } catch (error) {
    return new HttpError(500, "Can't handle error! " + error);
  }
};
