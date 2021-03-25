"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handle = void 0;
const common_1 = require("@nestjs/common");
const handle = (error, next) => {
    if (typeof error === 'string') {
        error = new Error(error);
    }
    const statusCode = error.statusCode || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
    const httpError = new common_1.HttpException({
        error: error.message,
        status: statusCode,
        stack: error.stack,
    }, statusCode);
    return next(httpError);
};
exports.handle = handle;
//# sourceMappingURL=exception-handler.js.map