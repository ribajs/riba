/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

// FIXME module is not resolved if the project wich use this config is in the riba workscape
const isModuleAvailable = (moduleName) => {
  try {
    return require.resolve(moduleName);
  } catch (error) {
    console.warn(error);
    return false;
  }
};

module.exports.isModuleAvailable = isModuleAvailable;
