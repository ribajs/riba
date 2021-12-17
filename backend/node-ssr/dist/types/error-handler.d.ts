import { ResponseError, ConsoleMessage } from "./types";
import { HttpException } from "./http-exception";
export declare const getStatus: (exception: any | HttpException | ResponseError | string) => number;
export declare const getMessage: (exception: any | ResponseError | string, messages?: ConsoleMessage[]) => string;
export declare const getStack: (exception: any | ResponseError | string) => string[];
export declare const handleError: (error: any | ResponseError | string, messages?: ConsoleMessage[]) => any;
