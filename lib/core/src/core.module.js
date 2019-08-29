"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const binders = __importStar(require("./binders"));
const formatters_1 = require("./formatters");
const services = __importStar(require("./services"));
exports.coreModule = {
    formatters: {
        ...formatters_1.specialFormatters,
        ...formatters_1.compareFormatters,
        ...formatters_1.mathFormatters,
        ...formatters_1.stringFormatters,
        ...formatters_1.propertyFormatters,
    },
    binders,
    services,
};
