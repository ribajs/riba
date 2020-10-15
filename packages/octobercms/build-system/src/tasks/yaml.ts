import { src, dest, series, task } from "gulp";
import { scssToOctoberYml } from "./includes/scss-to-october";
import { mergeOctoberFormFields } from "./includes/merge-october-yaml";
import "../types/index";
import * as yamlMerge from "gulp-yaml-merge";

task("build-yml", function buildExampleYmlFromScss() {
  return src("./assets/**/*.scss")
    .pipe(scssToOctoberYml())
    .pipe(dest("./build/tmp/"));
});

task("merge-yml", function () {
  return src("./build/tmp/**/*.yml")
    .pipe(yamlMerge("bundle.yml"))
    .pipe(dest("./build/"));
});

task("merge-with-october-yml", function mergeOctoberYamlTask() {
  return src("./default_theme.yaml", { allowEmpty: true })
    .pipe(mergeOctoberFormFields("./build/bundle.yml"))
    .pipe(dest("./"));
});

task(
  "build-scss-and-yml",
  series("build-yml", "merge-yml", "merge-with-october-yml")
);
