import { HttpError } from "https://deno.land/x/alosaur@v0.35.1/mod.ts";
import { ResponseError } from "./types/index.ts";

/**
 * @param exception
 * @returns
 */
export const getStatus = (
  exception: ResponseError | string,
): number => {
  if (typeof exception !== "string" && exception.status) {
    return exception.status;
  }
  return 500;
};

export const getMessage = (
  exception: HttpError | ResponseError | string,
): string => {
  let message = "Internal server error";

  if (typeof exception === "string") {
    message = exception;
  } else if (exception.message) {
    message = exception.message || message;
  }

  return `${message}`;
};

export const getStack = (
  exception: HttpError | ResponseError | string,
): string | undefined => {
  let stack: string | string[] | undefined;
  if (typeof exception === "string") {
    stack = new Error(exception).stack;
    return stack;
  }

  if (!exception.stack) {
    stack = new Error().stack;
  }

  if (!stack) {
    stack = exception.stack;
  }

  if (Array.isArray(stack)) {
    return stack.join("\n");
  }

  return stack;
};

export const handleError = (
  error: HttpError | ResponseError | string,
): HttpError => {
  console.error(error);
  if (error instanceof HttpError) {
    return error;
  }
  try {
    const httpError = new HttpError(getStatus(error), getMessage(error));
    httpError.stack = getStack(error);
    return httpError;
  } catch (error) {
    return new HttpError(500, "Can't handle error! " + error);
  }
};
