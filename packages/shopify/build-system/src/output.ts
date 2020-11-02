import gulp from "gulp";
import utils from "./includes/utilities";
// const utils = require("./includes/utilities.js");

/**
 * Handles the error summary at the end if there are errors to output.
 * This task will only be run for the build and zip tasks.
 */
gulp.task("output:errors", async () => {
  return utils.outputErrors();
});
