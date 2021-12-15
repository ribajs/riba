import { HttpException, HttpStatus } from '@nestjs/common';
import { ResponseError } from './types';

/**
 *
 * @param exception
 * @returns
 */
export const getStatus = (
  exception: HttpException | ResponseError | string,
): number => {
  if (exception instanceof HttpException) {
    return exception.getStatus();
  }
  if (typeof exception !== 'string' && exception.status) {
    return exception.status;
  }
  return HttpStatus.INTERNAL_SERVER_ERROR;
};

export const getMessage = (
  exception: HttpException | ResponseError | string,
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
  exception: HttpException | ResponseError | string,
): string[] => {
  let stack: string | string[] | undefined;
  if (typeof exception === 'string') {
    stack = new Error(exception).stack;
    return stack?.split('\n') || [];
  }

  if (!stack && exception instanceof HttpException) {
    const excResp = exception.getResponse();
    stack = (excResp as any).stack || exception.stack;
    if (Array.isArray(stack)) {
      return stack;
    }
    return stack?.split('\n') || [];
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

  return stack?.split('\n') || [];
};

export const handleError = (
  error: HttpException | ResponseError | string,
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
    return new HttpException(
      {
        message: "Can't handle error",
      },
      500,
    );
  }
};
