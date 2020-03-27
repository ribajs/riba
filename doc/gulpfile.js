/*jslint node: true */

'use strict';

const gulp = require('gulp');
const pkg = require('./package.json');
const zip = require('gulp-zip');
const print = require('gulp-print').default;
const jsoncombine = require('gulp-jsoncombine');

// list of settings files to include, in order of inclusion
const settingsSchemas = [
  'theme_info',
  'general',
  'home',
  'shopify_module',
];

const files = {
  zip: [
    'theme/assets/*',
    'theme/config/*',
    'theme/layout/*',
    'theme/locales/*',
    'theme/sections/*',
    'theme/snippets/*',
    'theme/templates/*',
    'theme/templates/customers/*'
  ],
  theme_settings: './settings_schema/*.json',
  iconset: './node_modules/@ribajs/iconset/dest/svg/*.svg',
  favicons: './src/assets/favicons/*'
};
 
/**
 * Cretae a zipped file of the theme that can be uploaded to Shopify
 */
gulp.task('build:zip', () => {
  return gulp.src(files.zip, {base: "."})
    .pipe(zip(pkg.name.replace('/', '-') + '-' + pkg.version + '.zip'))
    .pipe(gulp.dest('./'));
});

gulp.task('watch:zip', () => {
  return gulp.watch(files.zip, gulp.series('build:zip'));
});

/**
 * Create settings_schema.json
 */
gulp.task('build:theme_settings', () => {
  return gulp.src(files.theme_settings)
    .pipe(jsoncombine('settings_schema.json', (data) => {
      var data_array = [];
      // collect the json data and store it in the correct order
      for (var i = 0; i < settingsSchemas.length; i++) {
        var file = settingsSchemas[i];
        data_array.push(data[file]);
      }
      return new Buffer(JSON.stringify(data_array, null, 2));
    }))
    .pipe(gulp.dest('./theme/config/'));
});

gulp.task('build:assets:iconset', function () {
  return gulp.src(files.iconset)
    .pipe(print())
    .pipe(gulp.dest('./theme/assets'));
});

gulp.task('build:assets:favicons', function () {
  return gulp.src(files.favicons)
    .pipe(print())
    .pipe(gulp.dest('./theme/assets'));
});

gulp.task('build:assets', function () {
  return gulp.src([files.iconset, files.favicons])
    .pipe(print())
    .pipe(gulp.dest('./theme/assets'));
});