"use strict";
/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/lint-locales.js
 */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_1 = __importDefault(require("gulp"));
const gulp_util_1 = __importDefault(require("gulp-util"));
const theme_lint_1 = require("@shopify/theme-lint");
const config_1 = require("./includes/config");
const lint_reporter_1 = __importDefault(require("./includes/lint-reporter"));
/**
 * Runs all the translation tests and the reporter outputs
 * the locale results once completed.
 *
 * @returns {String} Finalized linting output
 * @private
 */
function lintLocales() {
    return __awaiter(this, void 0, void 0, function* () {
        return (0, theme_lint_1.runAll)(config_1.config.src.root, new lint_reporter_1.default())
            .then((reporter) => reporter.output())
            .catch((err) => {
            gulp_util_1.default.log(err);
            // throw err;
            // process.exit(2);
        });
    });
}
/**
 * Runs translation tests using @shopify/theme-lint
 *
 * @function lint:locales
 * @memberof slate-cli.tasks.lint
 * @static
 */
gulp_1.default.task("lint:locales", () => __awaiter(void 0, void 0, void 0, function* () {
    return lintLocales();
}));
//# sourceMappingURL=lint-locales.js.map