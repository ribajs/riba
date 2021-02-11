/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const { logger } = require("./logger");

// FIXME module is not resolved if the project which use this config is in the riba workspace
const isModuleAvailable = (moduleName) => {
  try {
    return require.resolve(moduleName);
  } catch (error) {
    logger.warn(error);
    return false;
  }
};

module.exports.isModuleAvailable = isModuleAvailable;
