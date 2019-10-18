const gulp = require('gulp');
const svg = require('gulp-svgmin');
const exec = require('gulp-exec');
const filelist = require('gulp-filelist');

const svgSource = 'src/svg/*.svg';
 
gulp.task('build:svg', () => {
  return gulp.src(svgSource)
    .pipe(svg())
    .pipe(gulp.dest('./dest/svg'));
});

gulp.task('build:filelist:svg', () => {
  return gulp.src(svgSource)
    .pipe(filelist('svg.json', { flatten: true, removeExtensions: true }))
    .pipe(gulp.dest('dest'))
});

gulp.task('build:filelist:png', () => {
  return gulp.src('dest/png/*.png')
    .pipe(filelist('png.json', { flatten: true, removeExtensions: true }))
    .pipe(gulp.dest('dest'))
});

gulp.task('build:filelist', gulp.parallel('build:filelist:svg', 'build:filelist:png'));

gulp.task('build:png:8', () => {
  const options = {size:8}
  return gulp.src([svgSource])
    .pipe(exec('echo <%= file.basename %>'))
    .pipe(exec('mkdir -p dest/png && inkscape -z -e dest/png/<%= file.basename.replace(".svg", "")  %>_<%= options.size %>.png -w <%= options.size %> -h <%= options.size %> <%= file.path %>', options))
    .pipe(exec.reporter());
});

gulp.task('build:png:16', () => {
  const options = {size:16}
  return gulp.src([svgSource])
    .pipe(exec('echo <%= file.basename %>'))
    .pipe(exec('mkdir -p dest/png && inkscape -z -e dest/png/<%= file.basename.replace(".svg", "")  %>_<%= options.size %>.png -w <%= options.size %> -h <%= options.size %> <%= file.path %>', options))
    .pipe(exec.reporter());
});

gulp.task('build:png:32', () => {
  const options = {size:32}
  return gulp.src([svgSource])
    .pipe(exec('echo <%= file.basename %>'))
    .pipe(exec('mkdir -p dest/png && inkscape -z -e dest/png/<%= file.basename.replace(".svg", "")  %>_<%= options.size %>.png -w <%= options.size %> -h <%= options.size %> <%= file.path %>', options))
    .pipe(exec.reporter());
});

gulp.task('build:png:64', () => {
  const options = {size:64}
  return gulp.src([svgSource])
    .pipe(exec('echo <%= file.basename %>'))
    .pipe(exec('mkdir -p dest/png && inkscape -z -e dest/png/<%= file.basename.replace(".svg", "")  %>_<%= options.size %>.png -w <%= options.size %> -h <%= options.size %> <%= file.path %>', options))
    .pipe(exec.reporter());
});

gulp.task('build:png:128', () => {
  const options = {size:128}
  return gulp.src([svgSource])
    .pipe(exec('echo <%= file.basename %>'))
    .pipe(exec('mkdir -p dest/png && inkscape -z -e dest/png/<%= file.basename.replace(".svg", "")  %>_<%= options.size %>.png -w <%= options.size %> -h <%= options.size %> <%= file.path %>', options))
    .pipe(exec.reporter());
});

gulp.task('build:png:256', () => {
  const options = {size:256}
  return gulp.src([svgSource])
    .pipe(exec('echo <%= file.basename %>'))
    .pipe(exec('mkdir -p dest/png && inkscape -z -e dest/png/<%= file.basename.replace(".svg", "")  %>_<%= options.size %>.png -w <%= options.size %> -h <%= options.size %> <%= file.path %>', options))
    .pipe(exec.reporter());
});

gulp.task('build:png', gulp.parallel('build:png:8', 'build:png:16', 'build:png:32', 'build:png:64', 'build:png:128', 'build:png:256'));

gulp.task('default', gulp.parallel('build:svg', gulp.series('build:png', 'build:filelist')));