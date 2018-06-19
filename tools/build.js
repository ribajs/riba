(function () {
  'use strict';
}());

import rollup from 'rollup';
import {uglify} from 'rollup-plugin-uglify';
import babel from 'rollup-plugin-babel';
import pkg from '../package.json';

const isDev = process.argv.indexOf('--development') !== -1;

let promise = Promise.resolve();

let dependencies = Object.assign({}, pkg.dependencies || {}, pkg.peerDependencies || {});

function getRollupOptions(plugins = []) {
  return {
    input: 'src/export.js',
    external: Object.keys(dependencies),
    plugins
  };
}

function getOutputOptions(format, filename = 'tinybind.js') {
  return {
    format: format,
    file: `dist/${filename}`,
    name: 'tinybind',    
    sourcemap: !isDev
  };
}

const plugins = [babel({
  presets: [
    [
      'env', 
      {
        loose: true, 
        modules: false,
        targets: {ie: 11}, 
        exclude: ['babel-plugin-transform-es2015-typeof-symbol']
      }
    ]
  ],
  plugins: ['external-helpers']
})];

// Compile source code into a distributable format with Babel
promise = promise.then(() => rollup.rollup(getRollupOptions(plugins))
  .then(bundle => bundle.write(getOutputOptions('umd'))));

if (!isDev) {
  promise = promise.then(() => rollup.rollup(getRollupOptions([...plugins, uglify()]))
    .then(bundle => bundle.write(getOutputOptions('umd', 'tinybind.min.js'))));

  promise = promise.then(() => rollup.rollup(getRollupOptions(plugins))
    .then(bundle => bundle.write(getOutputOptions('es', 'tinybind.esm.js'))));
}


promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console
