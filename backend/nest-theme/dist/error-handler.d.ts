import { HttpException } from '@nestjs/common';
export declare const getStatus: (exception: HttpException | Error | string) => number;
export declare const getMessage: (exception: HttpException | Error | string) => string;
export declare const getStack: (exception: HttpException | Error | string) => string[];
export declare const handleError: (error: HttpException | Error | string) => HttpException;
