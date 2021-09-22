import { HttpException, HttpStatus } from '@nestjs/common';
export const getStatus = (exception) => {
    if (exception instanceof HttpException) {
        return exception.getStatus();
    }
    if (typeof exception !== 'string' && exception.status) {
        return exception.status;
    }
    return HttpStatus.INTERNAL_SERVER_ERROR;
};
export const getMessage = (exception) => {
    let message = 'Internal server error';
    if (typeof exception === 'string') {
        message = exception;
    }
    else if (exception instanceof HttpException) {
        const excResp = exception.getResponse();
        message =
            typeof excResp === 'string'
                ? excResp
                : excResp.message || JSON.stringify(excResp);
    }
    else if (exception instanceof Error) {
        message = exception.message || message;
    }
    return `${message}`;
};
export const getStack = (exception) => {
    let stack;
    if (typeof exception === 'string') {
        stack = new Error(exception).stack;
        return stack.split('\n');
    }
    if (!stack && exception instanceof HttpException) {
        const excResp = exception.getResponse();
        stack = excResp.stack || exception.stack;
        if (Array.isArray(stack)) {
            return stack;
        }
        return stack.split('\n');
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
    return stack.split('\n');
};
export const handleError = (error) => {
    if (error instanceof HttpException) {
        return error;
    }
    try {
        return new HttpException({
            message: getMessage(error),
            stack: getStack(error),
        }, getStatus(error));
    }
    catch (error) {
        return new HttpException({
            message: "Can't handle error",
        }, 500);
    }
};
//# sourceMappingURL=error-handler.js.map