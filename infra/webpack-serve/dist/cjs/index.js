#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.start = void 0;
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path_1 = __importDefault(require("path"));
const webpack_1 = __importDefault(require("webpack"));
const webpack_dev_server_1 = __importDefault(require("webpack-dev-server"));
const pkg_dir_1 = __importDefault(require("pkg-dir"));
const get_port_1 = __importDefault(require("get-port"));
const yargs_1 = __importDefault(require("yargs/yargs"));
const helpers_1 = require("yargs/helpers");
const rootPath = pkg_dir_1.default.sync(process.cwd()) || process.cwd();
const argv = (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv)).argv;
const env = {
    production: argv.env === "production",
    development: argv.env === "development",
};
const start = async () => {
    let webpackConfig;
    try {
        const webpackPath = path_1.default.resolve(rootPath, "webpack.config.js");
        webpackConfig = await require(webpackPath)({
            production: env.production,
            development: env.development,
        });
        console.debug("Use webpack config from " + webpackPath);
    }
    catch (error) {
        console.warn(error);
        webpackConfig = await require("@ribajs/webpack-config")({
            template: "local",
            plugins: [
                // Plugin for hot module replacement
                new webpack_1.default.HotModuleReplacementPlugin(),
            ],
        })(env);
        console.debug("Use default webpack config from @ribajs/webpack-config");
    }
    const entry = Array.isArray(webpackConfig.entry)
        ? webpackConfig.entry
        : [webpackConfig.entry];
    webpackConfig.entry = [
        // Runtime code for hot module replacement
        "webpack/hot/dev-server.js",
        // Dev server client for web socket transport, hot and live reload logic
        "webpack-dev-server/client/index.js?hot=true&live-reload=true",
        ...entry,
    ];
    webpackConfig.devServer.host = webpackConfig.devServer.host || "0.0.0.0";
    webpackConfig.devServer.port = await (0, get_port_1.default)({
        port: webpackConfig.devServer.port || 8080,
    });
    const compiler = (0, webpack_1.default)(webpackConfig);
    const devServer = new webpack_dev_server_1.default(webpackConfig.devServer, compiler);
    await devServer.start();
};
exports.start = start;
exports.default = exports.start;
if (require.main === module) {
    module.exports = (0, exports.start)();
}
