/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const config = require("./tasks/includes/config.js").config;
const ribawWebpackConfig = require("@ribajs/webpack-config");
const webpackConfig = ribawWebpackConfig({ template: "Shopify" });
module.exports = webpackConfig;

// TODO
// // Try to get the babel.config.js from root of the project, otherwise use the default babel config
// let babelConfig;
// try {
//   babelConfig = require(path.resolve(config.themeRoot, "babel.config.js"));
// } catch (error) {
//   babelConfig = require("./babel.config.js");
// }
// baseWebpack.entry.checkout = path.resolve(
//   config.themeRoot,
//   config.src.checkoutTs
// );
// baseWebpack.optimization.splitChunks.cacheGroups.commons.name =
// "checkout.vendors";
