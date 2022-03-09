/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const postcssPresetEnv = require("postcss-preset-env");
const config = () => ({
  plugins: [postcssPresetEnv()],
});

module.exports = config;
