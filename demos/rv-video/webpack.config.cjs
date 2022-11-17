const ribaWebpackConfig = require("@ribajs/webpack-config");
const webpackConfig = ribaWebpackConfig({
  template: "local",
  copyAssets: {
    enable: true,
    images: true,
    scss: false,
    iconset: true,
    foldername: "public",
    patterns: [
      {
        from: "**/*.mp4",
        to: "public/videos",
        toType: "dir",
        context: "./src/videos",
      },
    ],
  },
});
module.exports = webpackConfig;
