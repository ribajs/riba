import gulp from "gulp";
import path from "path";
import webpack from "webpack";
import gulpWebpack from "webpack-stream";
import gutil from "gulp-util";

import { config } from "./includes/config";
import messages from "./includes/messages";

// Try to get the webpack.config.js from root of the project, otherwise use the default babel config
let webpackConfig: any;
try {
  webpackConfig = require(path.resolve(config.dist.root, "webpack.config.js"))(
    gutil.env.environments
  );
} catch (error) {
  webpackConfig = require("../webpack.config.js")(gutil.env.environments);
}

let webpackCheckoutConfig: any;
try {
  webpackCheckoutConfig = require(path.resolve(
    config.dist.root,
    "webpack-checkout.config.js"
  ))(gutil.env.environments);
} catch (error) {
  webpackCheckoutConfig = require("../webpack-checkout.config.js")(
    gutil.env.environments
  );
}

gulp.task("build:wp:main", () => {
  messages.logProcessFiles("build:wp:main");
  // console.debug("webpackConfig", webpackConfig);
  return gulp
    .src([config.src.mainTs])
    .pipe(gulpWebpack(webpackConfig, webpack as any))
    .pipe(gulp.dest(config.dist.assets));
});

gulp.task("watch:wp:main", () => {
  messages.logProcessFiles("watch:wp:main");
  webpackConfig.watch = true;
  return gulp
    .src(config.src.mainTs)
    .pipe(gulpWebpack(webpackConfig, webpack as any))
    .pipe(gulp.dest(config.dist.assets));
});

gulp.task("build:wp:checkout", () => {
  messages.logProcessFiles("build:wp:checkout");
  // console.debug("webpackConfig", webpackConfig);
  return gulp
    .src([config.src.checkoutTs])
    .pipe(gulpWebpack(webpackCheckoutConfig, webpack as any))
    .pipe(gulp.dest(config.dist.assets));
});

gulp.task("watch:wp:checkout", () => {
  messages.logProcessFiles("watch:wp:checkout");
  webpackCheckoutConfig.watch = true;
  return gulp
    .src(config.src.checkoutTs)
    .pipe(gulpWebpack(webpackCheckoutConfig, webpack as any))
    .pipe(gulp.dest(config.dist.assets));
});

gulp.task("build:wp", gulp.parallel("build:wp:main", "build:wp:checkout"));
gulp.task("watch:wp", gulp.parallel("watch:wp:main", "watch:wp:checkout"));
