#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import path from "path";
import webpack from "webpack";
import WDS from "webpack-dev-server";
import pkgDir from "./dependencies/pkg-dir";
import getPort from "./dependencies/get-port";
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;
const env = {
    production: argv.env === "production",
    development: argv.env === "development",
};
export const start = async () => {
    let webpackConfig;
    try {
        const rootPath = (await pkgDir(process.cwd())) || process.cwd();
        const webpackPath = path.resolve(rootPath, "webpack.config.js");
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
                new webpack.HotModuleReplacementPlugin(),
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
    webpackConfig.devServer.port = await getPort({
        port: webpackConfig.devServer.port || 8080,
    });
    const compiler = webpack(webpackConfig);
    const devServer = new WDS(webpackConfig.devServer, compiler);
    await devServer.start();
};
export default start;
if (require.main === module) {
    module.exports = start();
}
