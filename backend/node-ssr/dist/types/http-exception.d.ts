export declare class HttpException extends Error {
    stack?: string;
    httpCode: number;
    constructor(httpCode: number, message?: string, stack?: string[]);
}
