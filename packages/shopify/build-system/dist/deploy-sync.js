"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Custom version of https://raw.githubusercontent.com/Shopify/slate/0.x/packages/slate-tools/src/tasks/deploy-sync.js
 */
const gulp_1 = __importDefault(require("gulp"));
const browser_sync_1 = require("browser-sync");
const fs_1 = __importDefault(require("fs"));
const debug_1 = require("debug");
const config_1 = require("./includes/config");
const messages_1 = __importDefault(require("./includes/messages"));
const debug = debug_1.debug("slate-tools:deploy");
const browserSync = browser_sync_1.create();
const devScriptPath = require.resolve("./includes/dev-script.js");
/**
 * Starts a [browserSync]{@link https://www.browsersync.io/} session proxying your
 * store URL when a `--sync` flag is passed to the default `gulp` function.
 *
 * @function deploy:sync-init
 * @memberof slate-cli.tasks.deploy
 * @static
 */
gulp_1.default.task("deploy:sync-init", () => {
    if (browserSync.active) {
        browserSync.exit();
    }
    else {
        fs_1.default.writeFileSync(config_1.config.deployLog, ""); // eslint-disable-line no-sync
    }
    const devScript = fs_1.default.readFileSync(devScriptPath);
    const tkConfig = config_1.getYamlConfig(config_1.config.tkConfig);
    const queryStringComponents = [];
    const environment = config_1.config.environment.split(/\s*,\s*|\s+/)[0];
    const envObj = tkConfig[environment];
    let proxyTarget = `https://${envObj.store}`;
    // break theme preview cache by always setting a preview parameter
    const previewParam = envObj.theme_id === "live" ? "" : envObj.theme_id;
    proxyTarget += `?preview_theme_id=${previewParam}`;
    debug(proxyTarget);
    /**
     * Shopify sites with redirection enabled for custom domains force redirection
     * to that domain. `?_fd=0` prevents that forwarding.
     */
    queryStringComponents.push("_fd=0");
    browserSync.init({
        proxy: {
            target: proxyTarget,
            middleware: (req, res, next) => {
                const prefix = req.url.indexOf("?") > -1 ? "&" : "?";
                req.url += prefix + queryStringComponents.join("&");
                next();
            },
        },
        snippetOptions: {
            // Provide a custom Regex for inserting the snippet.
            rule: {
                match: /<\/body>/i,
                fn: (snippet, match) => {
                    return `<script defer="defer">${devScript}</script>
                  ${snippet}
                  ${match}`;
                },
            },
        },
    });
});
gulp_1.default.task("deploy:sync-watch", () => {
    gulp_1.default.watch(config_1.config.tkConfig, gulp_1.default.series("deploy:sync-init"));
    gulp_1.default.watch(config_1.config.deployLog, () => {
        messages_1.default.logTransferDone();
        browserSync.reload();
    });
});
/**
 * Starts a watcher to reload the [browserSync]{@link https://www.browsersync.io/}
 * session whenever a deploy completes.
 *
 * @function deploy:sync-reload
 * @memberof slate-cli.tasks.watch
 * @static
 */
gulp_1.default.task("deploy:sync-reload", gulp_1.default.series("deploy:sync-init", "deploy:sync-watch"));
//# sourceMappingURL=deploy-sync.js.map