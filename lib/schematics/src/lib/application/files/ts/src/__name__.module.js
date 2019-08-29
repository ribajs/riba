"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const binders = __importStar(require("./binders"));
const components = __importStar(require("./components"));
const formatters = __importStar(require("./formatters"));
;
classify(name) %  > Module;
core_1.IRibaModule = {
    binders,
    components,
    formatters,
    services: {},
};
