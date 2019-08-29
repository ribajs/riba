"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./binders"));
__export(require("./services"));
const routerBinders = __importStar(require("./binders"));
const services = __importStar(require("./services"));
exports.routerModule = {
    binders: routerBinders,
    services,
};
exports.default = exports.routerModule;
