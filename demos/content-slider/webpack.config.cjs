const ribaWebpackConfig = require('@ribajs/webpack-config');
const webpackConfig = ribaWebpackConfig({template: 'local', copyAssets: {
  enable: true,
  images: true,
  scss: false,
  iconset: true,
  foldername: 'dist',
  patterns: [{
    from: "**/*.(png|jpg)",
    to: "images",
    toType: "dir",
    context: "./src/images",
  }]
}});
module.exports = webpackConfig;
