"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
require("./output.cjs");
require("./build-assets.cjs");
require("./build-config.cjs");
require("./build-svg.cjs");
require("./build-utils.cjs");
require("./build-wp.cjs");
require("./build-schema.cjs");
gulp_1.default.task("build:zip", gulp_1.default.series("clean", gulp_1.default.parallel("build:wp", "build:schema", "build:assets", "build:assets:riba-shopify", "build:assets:riba-shopify-tda", "build:svg:snippet", "build:svg:asset")));
/**
 * Does a full clean/rebuild of your theme and creates a `.zip` compatible with
 * shopify.
 *
 * @function zip
 * @memberof slate-cli.tasks
 * @static
 */
gulp_1.default.task("zip", gulp_1.default.series("build:zip", "compress", "output:errors"));
gulp_1.default.task("build", gulp_1.default.series("clean", gulp_1.default.parallel("build:wp", "build:schema", "build:assets", "build:assets:favicons", "build:assets:riba-shopify", "build:assets:riba-shopify-tda", "build:config", "build:svg:snippet", "build:svg:asset"), "output:errors"));
//# sourceMappingURL=build.cjs.map