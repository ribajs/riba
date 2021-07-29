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
const config_1 = require("./includes/config");
const messages_1 = __importDefault(require("./includes/messages"));
// Try to get the webpack.config.js from root of the project, otherwise use the default babel config
let webpackConfig;
try {
    webpackConfig = require(path_1.default.resolve(config_1.config.dist.root, "webpack.config.js"))(gulp_util_1.default.env.environments);
}
catch (error) {
    webpackConfig = require("../webpack.config.js")(gulp_util_1.default.env.environments);
}
let webpackCheckoutConfig; // TODO
try {
    webpackCheckoutConfig = require(path_1.default.resolve(config_1.config.dist.root, "webpack-checkout.config.js"))(gulp_util_1.default.env.environments);
}
catch (error) {
    webpackCheckoutConfig = require("../webpack-checkout.config.js")(gulp_util_1.default.env.environments);
}
gulp_1.default.task("build:wp:main", (done) => {
    var _a;
    messages_1.default.logProcessFiles("build:wp:main");
    if (!webpackConfig.entry.main || ((_a = webpackConfig.entry.main) === null || _a === void 0 ? void 0 : _a.length) <= 0) {
        return done();
    }
    return gulp_1.default
        .src(webpackConfig.entry.main)
        .pipe(webpack_stream_1.default(webpackConfig, webpack_1.default)) // TODO
        .pipe(gulp_1.default.dest(config_1.config.dist.assets))
        .on("end", done);
});
gulp_1.default.task("watch:wp:main", (done) => {
    var _a;
    messages_1.default.logProcessFiles("watch:wp:main");
    if (!webpackConfig.entry.main || ((_a = webpackConfig.entry.main) === null || _a === void 0 ? void 0 : _a.length) <= 0) {
        return done();
    }
    webpackConfig.watch = true;
    return gulp_1.default
        .src(webpackConfig.entry.main)
        .pipe(webpack_stream_1.default(webpackConfig, webpack_1.default)) // TODO
        .pipe(gulp_1.default.dest(config_1.config.dist.assets))
        .on("end", done);
});
gulp_1.default.task("build:wp:checkout", (done) => {
    var _a;
    messages_1.default.logProcessFiles("build:wp:checkout");
    if (!webpackCheckoutConfig.entry.checkout ||
        ((_a = webpackCheckoutConfig.entry.checkout) === null || _a === void 0 ? void 0 : _a.length) <= 0) {
        return done();
    }
    return gulp_1.default
        .src(webpackCheckoutConfig.entry.checkout)
        .pipe(webpack_stream_1.default(webpackCheckoutConfig, webpack_1.default)) // TODO
        .pipe(gulp_1.default.dest(config_1.config.dist.assets))
        .on("end", done);
});
gulp_1.default.task("watch:wp:checkout", (done) => {
    var _a;
    messages_1.default.logProcessFiles("watch:wp:checkout");
    if (!webpackCheckoutConfig.entry.checkout ||
        ((_a = webpackCheckoutConfig.entry.checkout) === null || _a === void 0 ? void 0 : _a.length) <= 0) {
        return done();
    }
    webpackCheckoutConfig.watch = true;
    return gulp_1.default
        .src(webpackCheckoutConfig.entry.checkout)
        .pipe(webpack_stream_1.default(webpackCheckoutConfig, webpack_1.default)) // TODO
        .pipe(gulp_1.default.dest(config_1.config.dist.assets))
        .on("end", done);
});
gulp_1.default.task("build:wp", gulp_1.default.parallel("build:wp:main", "build:wp:checkout"));
gulp_1.default.task("watch:wp", gulp_1.default.parallel("watch:wp:main", "watch:wp:checkout"));
//# sourceMappingURL=build-wp.js.map