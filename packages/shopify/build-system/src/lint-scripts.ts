import gulp from "gulp";
import eslint from "gulp-eslint";
import path from "path";
import gutil from "gulp-util";

import { config } from "./includes/config";

const jsPath = path.join(config.themeRoot, config.src.jsPath);
const tsPath = path.join(config.themeRoot, config.src.tsPath);

const fallbackConfig = require("../../.eslintrc.js");

// Try to get the .eslintrc.js from root of the project, otherwise use the default config from this repository
let jSLintConfig: any;
let tSLintConfig: any;
try {
  jSLintConfig = require(path.join(jsPath, ".eslintrc.js"));
} catch (error) {
  jSLintConfig = fallbackConfig;
}
try {
  tSLintConfig = require(path.join(tsPath, ".eslintrc.js"));
} catch (error) {
  tSLintConfig = fallbackConfig;
}

const reportLint = (result: any) => {
  if (result.messages.length > 0) {
    gutil.log(`ESLint result: ${result.filePath}`);
    gutil.log(`# Messages: ${result.messages.length}`);
    gutil.log(`# Warnings: ${result.warningCount}`);
    gutil.log(`# Errors: ${result.errorCount}`);
    // for (const message of result.messages) {
    //   gutil.log(message);
    // }
  }
};

gulp.task("lint:js", () => {
  return gulp
    .src(
      [
        config.roots.js,
        config.sharedCode.roots.js,
        `!${config.roots.vendorJs}`,
        `!${config.sharedCode.roots.vendorJs}`,
      ],
      { allowEmpty: true }
    )
    .pipe(eslint(jSLintConfig))
    .pipe(eslint.result(reportLint))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task("lint:ts", () => {
  return gulp
    .src([config.src.ts, config.sharedCode.src.ts], { allowEmpty: true })
    .pipe(eslint(tSLintConfig))
    .pipe(eslint.result(reportLint))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
