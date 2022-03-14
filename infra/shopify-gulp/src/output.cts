import gulp from "gulp";
import { outputErrors } from "./includes/utilities.cjs";

/**
 * Handles the error summary at the end if there are errors to output.
 * This task will only be run for the build and zip tasks.
 */
gulp.task("output:errors", async () => {
  return outputErrors();
});
