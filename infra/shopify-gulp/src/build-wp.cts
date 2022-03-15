/* eslint-disable @typescript-eslint/no-var-requires */
import gulp from "gulp";
import path from "path";
import webpack from "webpack";
import gulpWebpack from "webpack-stream";
import gutil from "gulp-util";

import { config } from "./includes/config.cjs";
import messages from "./includes/messages.cjs";
import { findFile } from "./includes/utilities.cjs";

// Try to get the webpack.config.js from root of the project, otherwise use the default babel config
let webpackConfig: any | null = null; // TODO
let webpackCheckoutConfig: any; // TODO
let webpackConfigPath: string | null = null;
let webpackCheckoutConfigPath: string | null = null;

const webpackConfigFilenames = ["webpack.config.js", "webpack.config.cjs"];
const webpackCheckoutConfigFilenames = [
  "webpack-checkout.config.js",
  "webpack-checkout.config.cjs"
];

// webpack.config
webpackConfigPath = findFile(
  path.resolve(config.dist.root),
  webpackConfigFilenames
);

if (!webpackConfigPath) {
  webpackConfigPath = findFile(
    path.resolve(__dirname, ".."),
    webpackConfigFilenames
  );
}

// webpack-checkout.config
webpackCheckoutConfigPath = findFile(
  path.resolve(config.dist.root),
  webpackCheckoutConfigFilenames
);

if (!webpackCheckoutConfigPath) {
  webpackCheckoutConfigPath = findFile(
    path.resolve(__dirname, ".."),
    webpackCheckoutConfigFilenames
  );
}

webpackConfig = require(webpackConfigPath)(gutil.env.environments);
webpackCheckoutConfig = require(webpackCheckoutConfigPath)(
  gutil.env.environments
);

gulp.task("build:wp:main", (done) => {
  messages.logProcessFiles("build:wp:main");
  if (!webpackConfig.entry.main || webpackConfig.entry.main?.length <= 0) {
    return done();
  }
  return gulp
    .src(webpackConfig.entry.main)
    .pipe(gulpWebpack(webpackConfig, webpack as any)) // TODO
    .pipe(gulp.dest(config.dist.assets))
    .on("end", done);
});

gulp.task("watch:wp:main", (done) => {
  messages.logProcessFiles("watch:wp:main");
  if (!webpackConfig.entry.main || webpackConfig.entry.main?.length <= 0) {
    return done();
  }
  webpackConfig.watch = true;
  return gulp
    .src(webpackConfig.entry.main)
    .pipe(gulpWebpack(webpackConfig, webpack as any)) // TODO
    .pipe(gulp.dest(config.dist.assets))
    .on("end", done);
});

gulp.task("build:wp:checkout", (done) => {
  messages.logProcessFiles("build:wp:checkout");
  if (
    !webpackCheckoutConfig.entry.checkout ||
    webpackCheckoutConfig.entry.checkout?.length <= 0
  ) {
    return done();
  }
  return gulp
    .src(webpackCheckoutConfig.entry.checkout)
    .pipe(gulpWebpack(webpackCheckoutConfig, webpack as any)) // TODO
    .pipe(gulp.dest(config.dist.assets))
    .on("end", done);
});

gulp.task("watch:wp:checkout", (done) => {
  messages.logProcessFiles("watch:wp:checkout");
  if (
    !webpackCheckoutConfig.entry.checkout ||
    webpackCheckoutConfig.entry.checkout?.length <= 0
  ) {
    return done();
  }
  webpackCheckoutConfig.watch = true;
  return gulp
    .src(webpackCheckoutConfig.entry.checkout)
    .pipe(gulpWebpack(webpackCheckoutConfig, webpack as any)) // TODO
    .pipe(gulp.dest(config.dist.assets))
    .on("end", done);
});

gulp.task("build:wp", gulp.parallel("build:wp:main", "build:wp:checkout"));
gulp.task("watch:wp", gulp.parallel("watch:wp:main", "watch:wp:checkout"));
