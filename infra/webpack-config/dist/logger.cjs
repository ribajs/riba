"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
const logging = require("webpack/lib/logging/runtime");
exports.logger = logging.getLogger("@ribajs/webpack-config");
