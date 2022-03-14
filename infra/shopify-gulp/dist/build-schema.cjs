"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/build-svg.js
 */
const gulp_1 = __importDefault(require("gulp"));
const gulp_jsoncombine_1 = __importDefault(require("gulp-jsoncombine"));
const config_cjs_1 = require("./includes/config.cjs");
/**
 * Create settings_schema.json
 */
gulp_1.default.task("build:schema", () => {
    return gulp_1.default
        .src(config_cjs_1.config.src.schema)
        .pipe((0, gulp_jsoncombine_1.default)("settings_schema.json", (data) => {
        const data_array = [];
        for (const file of Object.keys(data)) {
            data_array.push(data[file]);
        }
        return Buffer.from(JSON.stringify(data_array, null, 2));
    }))
        .pipe(gulp_1.default.dest("./theme/config/"));
});
//# sourceMappingURL=build-schema.cjs.map