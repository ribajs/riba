import { HttpException, HttpStatus } from '@nestjs/common';
import type { NextFunction } from 'express';

export const handle = (error: Error | string, next: NextFunction) => {
  if (typeof error === 'string') {
    error = new Error(error);
  }

  const statusCode =
    (error as any).statusCode || HttpStatus.INTERNAL_SERVER_ERROR;

  const httpError = new HttpException(
    {
      error: error.message,
      status: statusCode,
      stack: error.stack,
    },
    statusCode,
  );

  // throw httpError;
  return next(httpError);
};
