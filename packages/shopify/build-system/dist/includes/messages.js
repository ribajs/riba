"use strict";
/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/includes/messages.js
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const gulp_util_1 = __importDefault(require("gulp-util"));
const chalk_1 = __importDefault(require("chalk"));
const danger = chalk_1.default.red;
const warning = chalk_1.default.yellow;
const success = chalk_1.default.green;
const colorize = (message, color = "default") => {
    switch (color) {
        case "danger":
            return danger(message);
        case "warning":
            return warning(message);
        case "success":
            return success(message);
    }
    return message;
};
/**
 * Separates filename and directory from a path string. Returns an object containing both.
 *
 * @param path {String} - a string representing the path to a file
 * @returns {Object} - an object with separated `file` (the filename) and `dir` (path minus filename) properties
 * @private
 */
function separatePath(path) {
    const tmp = path.split("/");
    return {
        file: tmp.pop(),
        dir: tmp.join("/"),
    };
}
const messages = {
    colorize,
    logFileEvent: (event, path) => {
        const pathObject = separatePath(path);
        gulp_util_1.default.log("change in", gulp_util_1.default.colors.magenta(pathObject.dir), gulp_util_1.default.colors.white("-"), gulp_util_1.default.colors.cyan(event), gulp_util_1.default.colors.yellow(pathObject.file ? pathObject.file : ""));
    },
    logTransferDone: () => {
        gulp_util_1.default.log("Transfer Complete:", gulp_util_1.default.colors.green("File changes successfully synced to store"));
    },
    logTransferFailed: (errMsg) => {
        gulp_util_1.default.log("Transfer Failed:", gulp_util_1.default.colors.yellow(`${typeof errMsg === "string"
            ? errMsg
            : "File(s) failed to upload to store. See log notes in deploy.log"}`));
    },
    logProcessFiles: (processName) => {
        gulp_util_1.default.log("running task", gulp_util_1.default.colors.white("-"), gulp_util_1.default.colors.cyan(processName));
    },
    logChildProcess: (cmd) => {
        gulp_util_1.default.log("running task", gulp_util_1.default.colors.bold("[child process]"), gulp_util_1.default.colors.white("-"), gulp_util_1.default.colors.cyan("theme", cmd));
    },
    logDeploys: (cmd, files) => {
        const timestamp = `Deploy complete @ ${new Date()}. `;
        const action = cmd === "upload" ? "added/changed " : "removed ";
        const amount = `${files.length} file(s): `;
        const fileList = `${files.join(", ")}.\n`;
        return timestamp + action + amount + fileList;
    },
    logDeployErrors: (cmd, files, err) => {
        const timestamp = `Deploy error @ ${new Date()}. `;
        const action = cmd === "upload" ? "added/changed " : "removed ";
        const amount = `${files.length} file(s): `;
        const fileList = `${files.join(", ")}.\n`;
        const errMsg = `${err} \n`;
        return timestamp + action + amount + fileList + errMsg;
    },
    logBundleJs: () => {
        gulp_util_1.default.log("Updating JS Bundle...");
    },
    configChange: () => {
        return ("Changes to ThemeKit Config Detected: You may need to quit <slate watch>" +
            " and run a full <slate deploy> as a result.");
    },
    translationsFailed: () => {
        return "Translation errors detected.";
    },
    invalidThemeId: (themeId, env) => {
        gulp_util_1.default.log("Invalid theme id for", gulp_util_1.default.colors.cyan(`${env}: ${themeId}`), gulp_util_1.default.colors.yellow('`theme_id` must be an integer or "live".'));
    },
    configError: () => {
        gulp_util_1.default.log("File missing:", gulp_util_1.default.colors.yellow("`config.yml` does not exist. You need to add a config file before you can make changes to your Shopify store."));
    },
    deployTo: (environment) => {
        gulp_util_1.default.log("Initiating deploy to", gulp_util_1.default.colors.bold(environment));
    },
    allDeploysComplete: () => {
        gulp_util_1.default.log("Multiple environments:", gulp_util_1.default.colors.green("Deploy completed for all environments in series"));
    },
};
module.exports = messages;
exports.default = messages;
//# sourceMappingURL=messages.js.map