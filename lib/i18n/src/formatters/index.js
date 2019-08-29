"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const t_formatter_1 = require("./t.formatter");
exports.default = (localesService) => {
    return {
        ...t_formatter_1.tFormatterWrapper(localesService),
    };
};
