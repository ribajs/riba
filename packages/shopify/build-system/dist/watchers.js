"use strict";
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
/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/watchers.js
 */
const gulp_1 = __importDefault(require("gulp"));
const lodash_1 = __importDefault(require("lodash"));
const gulp_util_1 = __importDefault(require("gulp-util"));
const chokidar_1 = __importDefault(require("chokidar"));
const fs_1 = __importDefault(require("fs"));
const themekit_1 = __importDefault(require("@shopify/themekit"));
const config_1 = require("./includes/config");
const utilities_js_1 = require("./includes/utilities.js");
const messages_js_1 = __importDefault(require("./includes/messages.js"));
const cache = utilities_js_1.createEventCache();
const environment = config_1.config.environment.split(/\s*,\s*|\s+/)[0];
let activeDeploy = false;
let deploy = null;
/**
 * If no deploy is active, call {@link deploy} passing files stored in
 *
 * @private
 */
function checkDeployStatus() {
    if (activeDeploy) {
        return;
    }
    if (cache.change.length) {
        deploy("deploy", cache.change, environment);
        cache.change = [];
    }
    else if (cache.unlink.length) {
        deploy("remove", cache.unlink, environment);
        cache.unlink = [];
    }
}
// prevent early execution on multi-file events
const debouncedDeployStatus = lodash_1.default.debounce(checkDeployStatus, 320);
/**
 * Executes a deployment (wrapped in a promise).  When the initial deploy
 * resolves, executes a call to {@link deployStatus}, recursively iterating
 * through subsequent cached files and deploying until no changes remain.
 *
 * @param {String|Array} cmd - the ThemeKit command to run (upload|remove)
 * @param {Array} files - an array of files to upload or remove @ the remote
 *   server
 * @private
 */
deploy = function async(cmd, files, env) {
    messages_js_1.default.logChildProcess(cmd);
    activeDeploy = true;
    gulp_util_1.default.log(`themekit cwd to: ${config_1.config.dist.root}`);
    return themekit_1.default
        .command(cmd, {
        "allow-live": true,
        env: env,
        files: files,
    }, { cwd: config_1.config.dist.root })
        .then(() => {
        activeDeploy = false;
        fs_1.default.appendFileSync(config_1.config.deployLog, messages_js_1.default.logDeploys(cmd, files)); // eslint-disable-line no-sync
        return checkDeployStatus();
    })
        .catch((err) => {
        activeDeploy = false;
        messages_js_1.default.logTransferFailed(err);
        fs_1.default.appendFileSync(config_1.config.deployLog, messages_js_1.default.logDeployErrors(cmd, files, err)); // eslint-disable-line no-sync
        return checkDeployStatus();
    });
};
/**
 * Aggregate task watching for file changes in `src` and
 * building/cleaning/updating `dist` accordingly.  *Made up of individual tasks
 * referenced in other files
 *
 * @function watch:src
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp_1.default.task("watch:src", gulp_1.default.parallel("watch:assets", "watch:assets:riba-shopify", "watch:assets:riba-shopify-tda", "watch:config", "watch:svg:snippet", "watch:svg:asset", "watch:wp"));
/**
 * Watches for changes in the `./dist` folder and passes event data to the
 * `cache` via {@link pushToCache}. A debounced {@link deployStatus} is also
 * called to pass files updated to the remote server through {@link deploy}
 * when any active deploy completes.
 *
 * @function watch:dist
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp_1.default.task("watch:dist", () => __awaiter(void 0, void 0, void 0, function* () {
    const watcher = chokidar_1.default.watch(["./"], {
        cwd: config_1.config.dist.root,
        ignored: [/(^|[/\\])\../, "config.yml"],
        ignoreInitial: true,
    });
    return watcher.on("all", (event, path) => {
        messages_js_1.default.logFileEvent(event, path);
        cache.addEvent(event, path);
        messages_js_1.default.deployTo(environment);
        debouncedDeployStatus();
    });
}));
//# sourceMappingURL=watchers.js.map