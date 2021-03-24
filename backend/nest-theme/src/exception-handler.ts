import { HttpException, HttpStatus } from '@nestjs/common';
import type { NextFunction } from 'express';

export const handle = (error: Error | string, next: NextFunction) => {
  if (typeof error === 'string') {
    error = new Error(error);
  }

  const httpError = new HttpException(
    {
      error: error.message,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
    },
    HttpStatus.INTERNAL_SERVER_ERROR,
  );

  // throw httpError;
  return next(httpError);
};
