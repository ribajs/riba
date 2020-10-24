/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const RibaWebpackConfig = require("@ribajs/webpack-config");
const { createConfigurator } = require("electron-webpack");

const path = require("path");
const rootPath = process.cwd();

const sourceMapSupportModulPath = path.dirname(
  require.resolve("webpack-node-externals/package.json")
);
console.log("sourceMapSupportModulPath", sourceMapSupportModulPath);

// Renderer

const ribaWebpackConfig = RibaWebpackConfig({
  template: "local",
  // Wait for bugfix: https://github.com/webpack/webpack/pull/10765
  // target: 'electron-renderer',
  entry: {
    renderer: [
      path.resolve(rootPath, "src/scss/renderer.scss"),
      path.resolve(rootPath, "src/ts/renderer/renderer.ts"),
    ],
  },
  output: {
    path: path.resolve(rootPath, "dist/"),
    filename: "renderer.js",
  },
  // We do not split the bundle on electron
  splitChunks: {},
  // TODO resolve assets with webpack or https://webpack.electron.build/using-static-assets
  copyAssets: {
    enable: true,
    iconset: true,
    foldername: "dist",
  },
});

// Main
const mainWebpackConfig = async (env = {}) => {
  env.configuration = {
    projectDir: rootPath,
  };
  const entry = {
    main: "./src/ts/main/main.ts",
    preload: "./src/ts/main/preload.ts",
  };

  const electronMainWebpackConigurator = await createConfigurator("main", env);
  const electronMainWebpackConfig = await electronMainWebpackConigurator.configure(
    entry,
    env
  );
  electronMainWebpackConfig.devtool = "inline-source-map";
  electronMainWebpackConfig.output.path = path.resolve(rootPath, "dist");

  // console.debug('electronMainWebpackConfig', electronMainWebpackConfig, 'rules', electronMainWebpackConfig.module.rules);
  return electronMainWebpackConfig;
};

module.exports = [ribaWebpackConfig, mainWebpackConfig];
