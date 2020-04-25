const rootPath = process.cwd();
const package = require(rootPath + "/package.json");

const moduleFound = (name) => {
  try {
    return require.resolve(name)
  } catch (error) {
    return false;
  }
}

const isModuleAvailable = (config, moduleName) => {
  return /*package.dependencies[moduleName] && */config.copyAssets.modules[moduleName] === true && moduleFound(moduleName);
}

module.exports.package = package;
module.exports.moduleFound = moduleFound;
module.exports.isModuleAvailable = isModuleAvailable;
