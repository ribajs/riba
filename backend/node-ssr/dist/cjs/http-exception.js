"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpException = void 0;
class HttpException extends Error {
    constructor(httpCode, message, stack) {
        super(message);
        this.httpCode = httpCode;
        this.stack = stack ? stack.join("\n") : new Error().stack;
    }
}
exports.HttpException = HttpException;
//# sourceMappingURL=http-exception.js.map