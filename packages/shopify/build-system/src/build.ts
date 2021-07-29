import gulp from "gulp";
import "./output";
require("./build-assets");
require("./build-config");
require("./build-svg");
require("./build-utils");
require("./build-wp");

gulp.task(
  "build:zip",
  gulp.series(
    "clean",
    gulp.parallel(
      "build:wp",
      "build:assets",
      "build:assets:riba-shopify",
      "build:assets:riba-shopify-tda",
      "build:svg:snippet",
      "build:svg:asset"
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
      "build:assets",
      "build:assets:favicons",
      "build:assets:riba-shopify",
      "build:assets:riba-shopify-tda",
      "build:config",
      "build:svg:snippet",
      "build:svg:asset"
    ),
    "output:errors"
  )
);
