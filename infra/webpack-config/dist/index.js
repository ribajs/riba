/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { getDependencies } = require("./dependencies");
const { getBaseConfig } = require("./base-config");
const { getConfig } = require("./config");

module.exports = (config = {}) => {
  return (env = {}) => {
    // Config without external dependencies
    config = getBaseConfig(config, env);
    // Dependencies based on base config
    config = getDependencies(config);
    // Full config (needs to check the available dependencies, so must used after getDependencies)
    config = getConfig(config, env);

    const webpackConfig = {
      optimization: config.optimization,
      entry: config.entry,
      devtool: env.production ? undefined : "inline-source-map",
      mode: env.production ? "production" : "development",
      output: config.output,
      resolve: config.resolve,
      // https://webpack.js.org/configuration/other-options/#cache
      cache: !env.production,
      externalsPresets: config.externalsPresets
        ? config.externalsPresets
        : undefined,
      externals: config.externals ? config.externals : undefined,
      devServer: config.devServer,
      module: {
        rules: config.rules,
      },
      plugins: config.plugins,
    };

    if (config.target) {
      webpackConfig.target = config.target;
    }

    return webpackConfig;
  };
};
