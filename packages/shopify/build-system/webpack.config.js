const config = require("./tasks/includes/config.js").config;
const ribawWebpackConfig = require('@ribajs/webpack-config');
const webpackConfig = ribawWebpackConfig({ template: 'Shopify' });
module.exports = webpackConfig;

// TODO
// output: {
//   filename: "[name].bundle.js",
//   path: path.resolve(config.themeRoot, config.dist.assets),
// },

// entry: {
//   main: path.resolve(config.themeRoot, config.src.mainTs),
// },

// // Try to get the babel.config.js from root of the project, otherwise use the default babel config
// let babelConfig;
// try {
//   babelConfig = require(path.resolve(config.themeRoot, "babel.config.js"));
// } catch (error) {
//   babelConfig = require("./babel.config.js");
// }
