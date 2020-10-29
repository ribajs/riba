/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * For a example vue webpack configuration see https://github.com/vuejs/vue-loader/blob/master/example/webpack.config.js
 *
 * TODO make use of vue-style-loader?
 */

const { VueLoaderPlugin } = require("vue-loader");
const ribaWebpackConfig = require("@ribajs/webpack-config");
const webpackConfig = ribaWebpackConfig({
  template: "local",
  define: {
    __VUE_OPTIONS_API__: "true",
    __VUE_PROD_DEVTOOLS__: "false"
  },
  rules: [{
    test: /\.vue$/,
    loader: "vue-loader",
  }],
  resolve: {
    alias: {
      "vue": require.resolve("vue/dist/vue.esm-bundler.js"),
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ]
});
module.exports = async (env) => {
  const envConfig = await webpackConfig(env);
  return envConfig;
};
