"use strict";
/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/includes/lint-reporter.js
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_util_1 = __importDefault(require("gulp-util"));
const lodash_1 = __importDefault(require("lodash"));
const messages_cjs_1 = __importDefault(require("./messages.cjs"));
/** Class representing a custom reporter for @shopify/theme-lint */
class Reporter {
    constructor() {
        this.successes = [];
        this.failures = [];
    }
    /**
     * Pushes a valid message onto successes.
     *
     * @param {String} message
     * @param {String} file
     */
    success(message, file = null, index = null) {
        this.successes.push([message, file, index]);
    }
    /**
     * Pushes an invalid message onto failures.
     *
     * @param {String} message
     * @param {String} file
     */
    failure(message, file = null, index = null) {
        this.failures.push([message, file, index]);
    }
    /**
     * Builds string output for translation tests
     * depending on successes and failures.
     */
    output() {
        const testsRun = this.failures.length + this.successes.length;
        if (this.failures.length === 0) {
            gulp_util_1.default.log("Translation tests complete:", gulp_util_1.default.colors.green(`Success (${testsRun} checks run)`));
        }
        else {
            gulp_util_1.default.log("Translation tests complete:", gulp_util_1.default.colors.red(`Failed (${testsRun} checks run)`));
            const failureGroups = lodash_1.default.groupBy(this.failures, (failure) => failure[1]);
            lodash_1.default.forOwn(failureGroups, (failures, file) => {
                gulp_util_1.default.log(gulp_util_1.default.colors.red(`${file}:`));
                failures.map((failure) => {
                    return gulp_util_1.default.log(failure[0]);
                });
            });
            throw new Error(messages_cjs_1.default.translationsFailed());
        }
        this.successes = this.failures = [];
    }
}
module.exports = Reporter;
exports.default = Reporter;
//# sourceMappingURL=lint-reporter.cjs.map