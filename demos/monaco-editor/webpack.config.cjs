const ribaWebpackConfig = require("@ribajs/webpack-config");
const MonacoWebpackPlugin = require("monaco-editor-webpack-plugin");
const webpackConfig = ribaWebpackConfig({
  template: "local",
  plugins: [new MonacoWebpackPlugin()],
});
module.exports = webpackConfig;
