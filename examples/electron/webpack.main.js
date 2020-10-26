/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { createConfigurator } = require("electron-webpack");
const pkgDir = require("pkg-dir");
const path = require("path");

const mainWpConfig = async (env = {}) => {
  const rootPath = await pkgDir(__dirname);
  env.configuration = {
    projectDir: rootPath,
  };
  const entry = {
    main: "./src/ts/main/main.ts",
    preload: "./src/ts/main/preload.ts",
  };

  const mainWpConigurator = await createConfigurator("main", env);
  const mainWpConfig = await mainWpConigurator.configure(entry, env);
  mainWpConfig.devtool = "inline-source-map";
  mainWpConfig.output.path = path.resolve(rootPath, "dist");

  console.log(mainWpConfig.optimization);
  // Remove wp 5 incompatible options
  delete mainWpConfig.optimization.namedModules;

  // console.debug("mainWpConfig", mainWpConfig);
  return mainWpConfig;
};

module.exports = mainWpConfig;
