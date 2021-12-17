import { HttpException } from "./http-exception";
export const getStatus = (exception) => {
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
export const getMessage = (exception, messages = []) => {
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
export const getStack = (exception) => {
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
export const handleError = (error, messages = []) => {
    if (error instanceof Error) {
        return error;
    }
    try {
        return new HttpException(getStatus(error), getMessage(error, messages), getStack(error));
    }
    catch (error) {
        return new HttpException(500, "Can't handle error");
    }
};
//# sourceMappingURL=error-handler.js.map