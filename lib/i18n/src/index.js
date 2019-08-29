"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./binders"));
__export(require("./components"));
__export(require("./formatters"));
__export(require("./services"));
const binders_1 = __importDefault(require("./binders"));
const formatters_1 = __importDefault(require("./formatters"));
const services = __importStar(require("./services"));
exports.i18nModule = (localesService) => {
    return {
        binders: binders_1.default(localesService),
        components: {},
        formatters: formatters_1.default(localesService),
        services,
    };
};
exports.default = exports.i18nModule;
