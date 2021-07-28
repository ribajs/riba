"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
const gulp_1 = __importDefault(require("gulp"));
const path_1 = __importDefault(require("path"));
const webpack = __importStar(require("webpack"));
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
gulp_1.default.task("build:wp:main", () => {
    messages_1.default.logProcessFiles("build:wp:main");
    return gulp_1.default
        .src(webpackConfig.entry.main)
        .pipe(webpack_stream_1.default(webpackConfig, webpack))
        .pipe(gulp_1.default.dest(config_1.config.dist.assets));
});
gulp_1.default.task("watch:wp:main", () => {
    messages_1.default.logProcessFiles("watch:wp:main");
    webpackConfig.watch = true;
    return gulp_1.default
        .src(webpackConfig.entry.main)
        .pipe(webpack_stream_1.default(webpackConfig, webpack))
        .pipe(gulp_1.default.dest(config_1.config.dist.assets));
});
gulp_1.default.task("build:wp:checkout", () => {
    var _a;
    messages_1.default.logProcessFiles("build:wp:checkout");
    if (!webpackCheckoutConfig.entry.checkout ||
        ((_a = webpackCheckoutConfig.entry.checkout) === null || _a === void 0 ? void 0 : _a.length) <= 0) {
        return gulp_util_1.default.noop;
    }
    return gulp_1.default
        .src(webpackCheckoutConfig.entry.checkout)
        .pipe(webpack_stream_1.default(webpackCheckoutConfig, webpack))
        .pipe(gulp_1.default.dest(config_1.config.dist.assets));
});
gulp_1.default.task("watch:wp:checkout", () => {
    messages_1.default.logProcessFiles("watch:wp:checkout");
    webpackCheckoutConfig.watch = true;
    return gulp_1.default
        .src(webpackCheckoutConfig.entry.checkout)
        .pipe(webpack_stream_1.default(webpackCheckoutConfig, webpack))
        .pipe(gulp_1.default.dest(config_1.config.dist.assets));
});
gulp_1.default.task("build:wp", gulp_1.default.parallel("build:wp:main", "build:wp:checkout"));
gulp_1.default.task("watch:wp", gulp_1.default.parallel("watch:wp:main", "watch:wp:checkout"));
//# sourceMappingURL=build-wp.js.map