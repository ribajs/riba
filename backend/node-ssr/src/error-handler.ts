import { ResponseError, ConsoleMessage } from "./types";
import { HttpException } from "./http-exception";

/**
 *
 * @param exception
 * @returns
 */
export const getStatus = (
  exception: any | HttpException | ResponseError | string
): number => {
  // Nest.js error
  if (typeof (exception as any).getStatus === "function") {
    return exception.getStatus();
  }
  if (typeof exception === "string") {
    return 500;
  }

  if (exception.status) {
    return exception.status;
  }

  if ((exception as HttpException).httpCode) {
    return exception.httpCode;
  }
  return 500;
};

export const getMessage = (
  exception: any | ResponseError | string,
  messages: ConsoleMessage[] = []
): string => {
  let message = "Internal server error";

  if (typeof exception === "string") {
    message = exception;
  } else if (typeof (exception as any).getResponse === "function") {
    // Nest.js error
    const excResp = exception.getResponse();
    message =
      typeof excResp === "string"
        ? excResp
        : (excResp as any).message || JSON.stringify(excResp);
  } else if (exception instanceof Error) {
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

export const getStack = (exception: any | ResponseError | string): string[] => {
  let stack: string | string[] | undefined;

  if (typeof exception === "string") {
    stack = new Error(exception).stack;
    return stack?.split("\n") || [];
  }

  // Nest.js error
  if (!stack && typeof (exception as any).getResponse === "function") {
    const excResp = (exception as any).getResponse();
    stack = (excResp as any).stack || exception.stack;
    if (Array.isArray(stack)) {
      return stack;
    }
    return stack?.split("\n") || [];
  }

  if (!exception.stack) {
    stack = new Error().stack;
  }

  if (!stack) {
    stack = exception.stack;
  }

  if (Array.isArray(stack)) {
    return stack;
  }

  return stack?.split("\n") || [];
};

export const handleError = (
  error: any | ResponseError | string,
  messages: ConsoleMessage[] = []
): any => {
  if (error instanceof Error) {
    return error;
  }
  try {
    return new HttpException(
      getStatus(error),
      getMessage(error, messages),
      getStack(error)
    );
  } catch (error) {
    return new HttpException(500, "Can't handle error");
  }
};
