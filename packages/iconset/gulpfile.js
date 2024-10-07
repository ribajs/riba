/* eslint-disable @typescript-eslint/no-var-requires */
import gulp from "gulp";
import svgmin from "gulp-svgmin";
import exec from "gulp-exec";
import clean from "gulp-clean";
// import debug from "gulp-debug";
import filelist from "gulp-filelist";

const svgSource = "src/svg/*.svg";

gulp.task("clean:svg", () => {
  return gulp.src("./dist/svg/*").pipe(clean());
});

gulp.task("build:svg", () => {
  return (
    gulp
      .src(svgSource)
      // .pipe(debug())
      // TODO: Wait for MR: https://github.com/ben-eb/gulp-svgmin/issues/125
      .pipe(
        svgmin((file) => {
          const name = file.basename.split(".")[0];
          return {
            // This should be set so that the plugins list is passed directly to SVGO
            full: true,
            plugins: [
              // You can declare the preset-default, override some of its plugins settings, and then extend it with other built-in plugins
              {
                name: "preset-default",
              },
              {
                name: "removeDimensions",
              },
              {
                name: "addAttributesToSVGElement",
                params: {
                  attributes: [
                    {
                      class: `iconset-${name}`,
                    },
                  ],
                },
              },
            ],
          };
        })
      )
      .pipe(gulp.dest("./dist/svg"))
  );
});

gulp.task("build:filelist:svg", () => {
  return gulp
    .src(svgSource)
    .pipe(filelist("svg.json", { flatten: true, removeExtensions: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("build:filelist:png", () => {
  return gulp
    .src("dist/png/*.png")
    .pipe(filelist("png.json", { flatten: true, removeExtensions: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task(
  "build:filelist",
  gulp.parallel("build:filelist:svg", "build:filelist:png")
);

gulp.task("build:png:8", () => {
  const options = { size: 8 };
  return gulp
    .src([svgSource])
    .pipe(exec("echo <%= file.basename %>"))
    .pipe(
      exec(
        'mkdir -p dist/png && inkscape -z -e dist/png/<%= file.basename.replace(".svg", "")  %>_<%= options.size %>.png -w <%= options.size %> -h <%= options.size %> <%= file.path %>',
        options
      )
    )
    .pipe(exec.reporter());
});

gulp.task("build:png:16", () => {
  const options = { size: 16 };
  return gulp
    .src([svgSource])
    .pipe(exec("echo <%= file.basename %>"))
    .pipe(
      exec(
        'mkdir -p dist/png && inkscape -z -e dist/png/<%= file.basename.replace(".svg", "")  %>_<%= options.size %>.png -w <%= options.size %> -h <%= options.size %> <%= file.path %>',
        options
      )
    )
    .pipe(exec.reporter());
});

gulp.task("build:png:32", () => {
  const options = { size: 32 };
  return gulp
    .src([svgSource])
    .pipe(exec("echo <%= file.basename %>"))
    .pipe(
      exec(
        'mkdir -p dist/png && inkscape -z -e dist/png/<%= file.basename.replace(".svg", "")  %>_<%= options.size %>.png -w <%= options.size %> -h <%= options.size %> <%= file.path %>',
        options
      )
    )
    .pipe(exec.reporter());
});

gulp.task("build:png:64", () => {
  const options = { size: 64 };
  return gulp
    .src([svgSource])
    .pipe(exec("echo <%= file.basename %>"))
    .pipe(
      exec(
        'mkdir -p dist/png && inkscape -z -e dist/png/<%= file.basename.replace(".svg", "")  %>_<%= options.size %>.png -w <%= options.size %> -h <%= options.size %> <%= file.path %>',
        options
      )
    )
    .pipe(exec.reporter());
});

gulp.task("build:png:128", () => {
  const options = { size: 128 };
  return gulp
    .src([svgSource])
    .pipe(exec("echo <%= file.basename %>"))
    .pipe(
      exec(
        'mkdir -p dist/png && inkscape -z -e dist/png/<%= file.basename.replace(".svg", "")  %>_<%= options.size %>.png -w <%= options.size %> -h <%= options.size %> <%= file.path %>',
        options
      )
    )
    .pipe(exec.reporter());
});

gulp.task("build:png:256", () => {
  const options = { size: 256 };
  return gulp
    .src([svgSource])
    .pipe(exec("echo <%= file.basename %>"))
    .pipe(
      exec(
        'mkdir -p dist/png && inkscape -z -e dist/png/<%= file.basename.replace(".svg", "")  %>_<%= options.size %>.png -w <%= options.size %> -h <%= options.size %> <%= file.path %>',
        options
      )
    )
    .pipe(exec.reporter());
});

gulp.task(
  "build:png",
  gulp.parallel(
    "build:png:8",
    "build:png:16",
    "build:png:32",
    "build:png:64",
    "build:png:128",
    "build:png:256"
  )
);

gulp.task(
  "default",
  gulp.parallel("build:svg", gulp.series("build:png", "build:filelist"))
);
