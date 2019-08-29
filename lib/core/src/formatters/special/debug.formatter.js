"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const debug_module_1 = require("../../vendors/debug.module");
const _debug = debug_module_1.Debug('formatter');
exports.debug = {
    name: 'debug',
    read(toPrint) {
        _debug(toPrint);
        return toPrint;
    },
};
