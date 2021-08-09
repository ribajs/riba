/**
 * Custom version of https://github.com/Shopify/slate/blob/0.x/packages/slate-tools/src/tasks/build-svg.js
 */
import gulp from "gulp";
import jsoncombine from "gulp-jsoncombine";
import { config } from "./includes/config";

/**
 * Create settings_schema.json
 */
gulp.task("build:schema", () => {
  return gulp
    .src(config.src.schema)
    .pipe(
      jsoncombine("settings_schema.json", (data: any) => {
        const data_array: any[] = [];
        console.debug("data", data);
        for (const file of Object.keys(data)) {
          data_array.push(data[file]);
        }
        return Buffer.from(JSON.stringify(data_array, null, 2));
      })
    )
    .pipe(gulp.dest("./theme/config/"));
});
