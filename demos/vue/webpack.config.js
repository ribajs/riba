/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * For a example vue webpack configuration see https://github.com/vuejs/vue-loader/blob/master/example/webpack.config.js
 *
 * TODO make use of vue-style-loader
 */

const { VueLoaderPlugin } = require("vue-loader");
const ribaWebpackConfig = require("@ribajs/webpack-config");
const webpackConfig = ribaWebpackConfig({ template: "local" });
module.exports = (env) => {
  const envConfig = webpackConfig(env);

  const vueEsmPath = require.resolve("vue/dist/vue.esm-bundler.js");
  console.log("vueEsmPath", vueEsmPath);

  // resolve vue
  envConfig.resolve = envConfig.resolve || {};
  envConfig.resolve.alias = envConfig.resolve.alias || {};
  envConfig.resolve.alias["vue"] = vueEsmPath;

  // vue loader rule
  envConfig.module = envConfig.module || {};
  envConfig.module.rules = envConfig.module.rules || [];
  envConfig.module.rules.unshift({
    test: /\.vue$/,
    loader: "vue-loader",
  });

  // vue loader plugin
  envConfig.plugins = envConfig.plugins || [];
  envConfig.plugins.push(new VueLoaderPlugin());

  // Resolve vue-loader
  envConfig.resolveLoader = envConfig.resolveLoader || {};
  envConfig.resolveLoader.alias = envConfig.resolveLoader.alias || {};
  envConfig.resolveLoader.alias["vue-loader"] = require.resolve("vue-loader");

  return envConfig;
};
