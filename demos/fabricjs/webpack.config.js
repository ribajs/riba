const ribaWebpackConfig = require('@ribajs/webpack-config');
const webpackConfig = ribaWebpackConfig({
  template: 'local',
    copyAssets: {
    enable: true,
    images: true,
    scss: false,
    iconset: false,
    foldername: "dist",
    patterns: [{
        from: "**/*.(png|jpg)",
        to: "assets",
      toType: "dir",
      context: "src/assets",
    }]
  }
});
module.exports = webpackConfig;
