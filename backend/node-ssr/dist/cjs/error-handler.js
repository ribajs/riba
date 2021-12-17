"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = exports.getStack = exports.getMessage = exports.getStatus = void 0;
const http_exception_1 = require("./http-exception");
const getStatus = (exception) => {
    if (typeof exception.getStatus === "function") {
        return exception.getStatus();
    }
    if (typeof exception === "string") {
        return 500;
    }
    if (exception.status) {
        return exception.status;
    }
    if (exception.httpCode) {
        return exception.httpCode;
    }
    return 500;
};
exports.getStatus = getStatus;
const getMessage = (exception, messages = []) => {
    let message = "Internal server error";
    if (typeof exception === "string") {
        message = exception;
    }
    else if (typeof exception.getResponse === "function") {
        const excResp = exception.getResponse();
        message =
            typeof excResp === "string"
                ? excResp
                : excResp.message || JSON.stringify(excResp);
    }
    else if (exception instanceof Error) {
        message = exception.message || message;
    }
    const errorMessages = messages
        .filter((message) => message.type === "error" || message.type === "warn")
        .map((log) => JSON.stringify(log))
        .join("\n");
    if (errorMessages) {
        message += "\n" + errorMessages;
    }
    return message;
};
exports.getMessage = getMessage;
const getStack = (exception) => {
    let stack;
    if (typeof exception === "string") {
        stack = new Error(exception).stack;
        return stack?.split("\n") || [];
    }
    if (!stack && typeof exception.getResponse === "function") {
        const excResp = exception.getResponse();
        stack = excResp.stack || exception.stack;
        if (Array.isArray(stack)) {
            return stack;
        }
        return stack?.split("\n") || [];
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
    return stack?.split("\n") || [];
};
exports.getStack = getStack;
const handleError = (error, messages = []) => {
    if (error instanceof Error) {
        return error;
    }
    try {
        return new http_exception_1.HttpException((0, exports.getStatus)(error), (0, exports.getMessage)(error, messages), (0, exports.getStack)(error));
    }
    catch (error) {
        return new http_exception_1.HttpException(500, "Can't handle error");
    }
};
exports.handleError = handleError;
//# sourceMappingURL=error-handler.js.map