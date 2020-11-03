"use strict";
/* eslint-disable no-sync,no-process-env */
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
 * Custom version of https://raw.githubusercontent.com/Shopify/slate/0.x/packages/slate-tools/src/tasks/deploy-utils.js
 */
const gulp_1 = __importDefault(require("gulp"));
// import BPromise from "bluebird";
const fs_1 = __importDefault(require("fs"));
const gulp_util_1 = __importDefault(require("gulp-util"));
const open_1 = __importDefault(require("open"));
// const open = BPromise.promisify(_open);
const yaml = require("js-yaml");
const themekit = require("@shopify/themekit");
const config_1 = require("./includes/config");
const utilities_1 = __importDefault(require("./includes/utilities"));
const messages_1 = __importDefault(require("./includes/messages"));
/**
 * simple promise factory wrapper for deploys
 * @param env - the environment to deploy to
 * @returns {Promise}
 * @private
 */
function deploy(env) {
    return __awaiter(this, void 0, void 0, function* () {
        gulp_util_1.default.log(`themekit cwd to: ${config_1.config.dist.root}`);
        return themekit
            .command("deploy", {
            "allow-live": true,
            env: env,
        }, { cwd: config_1.config.dist.root })
            .catch((err) => {
            messages_1.default.logTransferFailed(err);
        });
    });
}
/**
 * Validate theme_id used for the environment
 * @param {Object} - settings of theme_id and environment
 * @returns {Promise}
 * @private
 */
function validateId(settings) {
    return new Promise((resolve, reject) => {
        // Only string allowed is "live"
        if (settings.themeId === "live") {
            resolve();
        }
        const id = Number(settings.themeId);
        if (isNaN(id)) {
            reject(settings);
        }
        else {
            resolve();
        }
    });
}
/**
 * Validate the config.yml theme_id is an integer or "live"
 * @function validate:id
 * @memberof slate-cli.tasks.watch, slate-cli.tasks.deploy
 * @private
 */
gulp_1.default.task("validate:id", () => __awaiter(void 0, void 0, void 0, function* () {
    let file;
    try {
        file = fs_1.default.readFileSync(config_1.config.tkConfig, "utf8");
    }
    catch (err) {
        if (err.code !== "ENOENT") {
            throw new Error(err);
        }
        messages_1.default.configError();
        return process.exit(2);
    }
    const tkConfig = yaml.safeLoad(file);
    let envObj;
    const environments = config_1.config.environment.split(/\s*,\s*|\s+/);
    const promises = [];
    environments.forEach((environment) => {
        function factory() {
            envObj = tkConfig[environment];
            const envSettings = {
                themeId: envObj.theme_id,
                environment,
            };
            return validateId(envSettings);
        }
        promises.push(factory);
    });
    return utilities_1.default.promiseSeries(promises).catch((result) => {
        // stop process to prevent deploy defaulting to published theme
        messages_1.default.invalidThemeId(result.themeId, result.environment);
        return process.exit(2);
    });
}));
/**
 * Replace your existing theme using ThemeKit.
 *
 * @function deploy:replace
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp_1.default.task("deploy:replace", () => __awaiter(void 0, void 0, void 0, function* () {
    gulp_util_1.default.log(`environments ${config_1.config.environment}`);
    const environments = config_1.config.environment.split(/\s*,\s*|\s+/);
    const promises = [];
    environments.forEach((environment) => {
        function factory() {
            messages_1.default.deployTo(environment);
            return deploy(environment);
        }
        promises.push(factory);
    });
    return utilities_1.default.promiseSeries(promises).then(() => {
        return messages_1.default.allDeploysComplete();
    });
}));
/**
 * Opens the Store in the default browser (for manual upgrade/deployment)
 *
 * @function open:admin
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp_1.default.task("open:admin", () => __awaiter(void 0, void 0, void 0, function* () {
    const file = fs_1.default.readFileSync(config_1.config.tkConfig, "utf8");
    const tkConfig = yaml.safeLoad(file);
    let envObj;
    const environments = config_1.config.environment.split(/\s*,\s*|\s+/);
    const promises = [];
    environments.forEach((environment) => {
        function factory() {
            envObj = tkConfig[environment];
            return open_1.default(`https://${envObj.store}/admin/themes`);
        }
        promises.push(factory);
    });
    return utilities_1.default.promiseSeries(promises);
}));
/**
 * Opens the Zip file in the file browser
 *
 * @function open:zip
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp_1.default.task("open:zip", () => {
    return open_1.default("upload");
});
//# sourceMappingURL=deploy-utils.js.map