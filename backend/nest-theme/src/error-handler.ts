import { HttpException, HttpStatus } from '@nestjs/common';

/**
 *
 * @param exception
 * @returns
 */
export const getStatus = (
  exception: HttpException | Error | string,
): number => {
  const status =
    exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  return status;
};

export const getMessage = (
  exception: HttpException | Error | string,
): string => {
  let message = 'Internal server error';

  if (typeof exception === 'string') {
    message = exception;
  } else if (exception instanceof HttpException) {
    const excResp = exception.getResponse();
    message =
      typeof excResp === 'string'
        ? excResp
        : (excResp as any).message || JSON.stringify(excResp);
  } else if (exception instanceof Error) {
    message = exception.message || message;
  }

  return `${message}`;
};

export const getStack = (
  exception: HttpException | Error | string,
): string[] => {
  let stack: string | string[];
  if (typeof exception === 'string') {
    stack = new Error(exception).stack;
    return stack.split('\n');
  }

  if (!stack && exception instanceof HttpException) {
    const excResp = exception.getResponse();
    stack = (excResp as any).stack || exception.stack;
    if (Array.isArray(stack)) {
      return stack;
    }
    return stack.split('\n');
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

  return stack.split('\n');
};

export const handleError = (
  error: HttpException | Error | string,
): HttpException => {
  if (error instanceof HttpException) {
    return error;
  }
  try {
    return new HttpException(
      {
        message: getMessage(error),
        stack: getStack(error),
      },
      getStatus(error),
    );
  } catch (error) {
    console.error(error);
    return new HttpException(
      {
        message: "Can't handle error",
      },
      500,
    );
  }
};
