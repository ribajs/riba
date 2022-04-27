"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const gulp_1 = __importDefault(require("gulp"));
const path_1 = __importDefault(require("path"));
const webpack_1 = __importDefault(require("webpack"));
const webpack_stream_1 = __importDefault(require("webpack-stream"));
const gulp_util_1 = __importDefault(require("gulp-util"));
const config_cjs_1 = require("./includes/config.cjs");
const messages_cjs_1 = __importDefault(require("./includes/messages.cjs"));
const utilities_cjs_1 = require("./includes/utilities.cjs");
// Try to get the webpack.config.js from root of the project, otherwise use the default babel config
let webpackConfig = null; // TODO
let webpackCheckoutConfig; // TODO
let webpackConfigPath = null;
let webpackCheckoutConfigPath = null;
const webpackConfigFilenames = ["webpack.config.js", "webpack.config.cjs"];
const webpackCheckoutConfigFilenames = [
    "webpack-checkout.config.js",
    "webpack-checkout.config.cjs",
];
// webpack.config
webpackConfigPath = (0, utilities_cjs_1.findFile)(path_1.default.resolve(config_cjs_1.config.dist.root), webpackConfigFilenames);
if (!webpackConfigPath) {
    webpackConfigPath = (0, utilities_cjs_1.findFile)(path_1.default.resolve(config_cjs_1.config.dist.root, ".."), webpackConfigFilenames);
}
// webpack-checkout.config
webpackCheckoutConfigPath = (0, utilities_cjs_1.findFile)(path_1.default.resolve(config_cjs_1.config.dist.root), webpackCheckoutConfigFilenames);
if (!webpackCheckoutConfigPath) {
    webpackCheckoutConfigPath = (0, utilities_cjs_1.findFile)(path_1.default.resolve(config_cjs_1.config.dist.root, ".."), webpackCheckoutConfigFilenames);
}
webpackConfig = require(webpackConfigPath)(gulp_util_1.default.env.environments);
webpackCheckoutConfig = require(webpackCheckoutConfigPath)(gulp_util_1.default.env.environments);
gulp_1.default.task("build:wp:main", (done) => {
    var _a;
    messages_cjs_1.default.logProcessFiles("build:wp:main");
    if (!webpackConfig.entry.main || ((_a = webpackConfig.entry.main) === null || _a === void 0 ? void 0 : _a.length) <= 0) {
        return done();
    }
    return gulp_1.default
        .src(webpackConfig.entry.main)
        .pipe((0, webpack_stream_1.default)(webpackConfig, webpack_1.default)) // TODO
        .pipe(gulp_1.default.dest(config_cjs_1.config.dist.assets))
        .on("end", done);
});
gulp_1.default.task("watch:wp:main", (done) => {
    var _a;
    messages_cjs_1.default.logProcessFiles("watch:wp:main");
    if (!webpackConfig.entry.main || ((_a = webpackConfig.entry.main) === null || _a === void 0 ? void 0 : _a.length) <= 0) {
        return done();
    }
    webpackConfig.watch = true;
    return gulp_1.default
        .src(webpackConfig.entry.main)
        .pipe((0, webpack_stream_1.default)(webpackConfig, webpack_1.default)) // TODO
        .pipe(gulp_1.default.dest(config_cjs_1.config.dist.assets))
        .on("end", done);
});
gulp_1.default.task("build:wp:checkout", (done) => {
    var _a;
    messages_cjs_1.default.logProcessFiles("build:wp:checkout");
    if (!webpackCheckoutConfig.entry.checkout ||
        ((_a = webpackCheckoutConfig.entry.checkout) === null || _a === void 0 ? void 0 : _a.length) <= 0) {
        return done();
    }
    return gulp_1.default
        .src(webpackCheckoutConfig.entry.checkout)
        .pipe((0, webpack_stream_1.default)(webpackCheckoutConfig, webpack_1.default)) // TODO
        .pipe(gulp_1.default.dest(config_cjs_1.config.dist.assets))
        .on("end", done);
});
gulp_1.default.task("watch:wp:checkout", (done) => {
    var _a;
    messages_cjs_1.default.logProcessFiles("watch:wp:checkout");
    if (!webpackCheckoutConfig.entry.checkout ||
        ((_a = webpackCheckoutConfig.entry.checkout) === null || _a === void 0 ? void 0 : _a.length) <= 0) {
        return done();
    }
    webpackCheckoutConfig.watch = true;
    return gulp_1.default
        .src(webpackCheckoutConfig.entry.checkout)
        .pipe((0, webpack_stream_1.default)(webpackCheckoutConfig, webpack_1.default)) // TODO
        .pipe(gulp_1.default.dest(config_cjs_1.config.dist.assets))
        .on("end", done);
});
gulp_1.default.task("build:wp", gulp_1.default.parallel("build:wp:main", "build:wp:checkout"));
gulp_1.default.task("watch:wp", gulp_1.default.parallel("watch:wp:main", "watch:wp:checkout"));
//# sourceMappingURL=build-wp.cjs.map