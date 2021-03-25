import { HttpException, HttpStatus } from '@nestjs/common';

/**
 *
 * @param exception
 * @returns
 */
export const getStatus = (exception: HttpException | Error | string) => {
  const status =
    exception instanceof HttpException
      ? exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  return status;
};

export const getMessage = (exception: HttpException | Error | string) => {
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

export const getStack = (exception: HttpException | Error | string) => {
  if (typeof exception === 'string') {
    return new Error(exception).stack;
  }

  if (exception instanceof HttpException) {
    const excResp = exception.getResponse();
    return (excResp as any).stack || exception.stack;
  }

  if (!exception.stack) {
    return new Error().stack;
  }

  return exception.stack;
};

export const handleError = (error: HttpException | Error | string) => {
  if (error instanceof HttpException) {
    return error;
  }
  return new HttpException(
    {
      message: getMessage(error),
      stack: getStack(error),
    },
    getStatus(error),
  );
};
