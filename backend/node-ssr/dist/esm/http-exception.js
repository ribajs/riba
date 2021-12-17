export class HttpException extends Error {
    constructor(httpCode, message, stack) {
        super(message);
        this.httpCode = httpCode;
        this.stack = stack ? stack.join("\n") : new Error().stack;
    }
}
//# sourceMappingURL=http-exception.js.map