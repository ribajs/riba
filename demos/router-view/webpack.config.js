const { resolve } = require("path");
const templatePath = resolve(__dirname, "src");
const ribaWebpackConfig = require("@ribajs/webpack-config");
const webpackConfig = ribaWebpackConfig({
  template: "local",
  htmlTemplatePaths: [
    resolve(templatePath, "index.html"),
    resolve(templatePath, "page-1.html"),
    resolve(templatePath, "page-2.html"),
  ],
});
module.exports = webpackConfig;
