const ribaWebpackConfig = require('@ribajs/webpack-config');
const webpackConfig = ribaWebpackConfig({
  template: 'local',
  // devServer: {
  //   port: 8080,
  //   host: "0.0.0.0",
  //   hot: true,
  //   static: {
  //     directory: __dirname + "/src/",
  //   }
  // }
});
module.exports = webpackConfig;
