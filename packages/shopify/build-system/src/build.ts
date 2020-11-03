import gulp from "gulp";
import "./output";
require("./build-assets");
require("./build-config");
require("./build-css");
require("./build-js");
require("./build-postalcodes");
require("./build-svg");
require("./build-utils");
require("./build-wp");

gulp.task(
  "build:zip",
  gulp.series(
    "clean",
    gulp.parallel(
      "build:wp",
      "build:js",
      "build:vendor-js",
      "build:css",
      "build:assets",
      "build:assets:shared-code",
      "build:svg"
    )
  )
);

/**
 * Does a full clean/rebuild of your theme and creates a `.zip` compatible with
 * shopify.
 *
 * @function zip
 * @memberof slate-cli.tasks
 * @static
 */
gulp.task("zip", gulp.series("build:zip", "compress", "output:errors"));

gulp.task(
  "build",
  gulp.series(
    "clean",
    gulp.parallel(
      "build:wp",
      "build:js",
      "build:vendor-js",
      "build:css",
      "build:assets",
      "build:assets:shared-code",
      "build:config",
      "build:svg"
    ),
    "output:errors"
  )
);
