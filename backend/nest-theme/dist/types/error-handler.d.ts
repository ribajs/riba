import { HttpException } from '@nestjs/common';
import { ResponseError } from './types';
export declare const getStatus: (exception: HttpException | ResponseError | string) => number;
export declare const getMessage: (exception: HttpException | ResponseError | string) => string;
export declare const getStack: (exception: HttpException | ResponseError | string) => string[];
export declare const handleError: (error: HttpException | ResponseError | string) => HttpException;
