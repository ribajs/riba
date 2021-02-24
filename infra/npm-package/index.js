const { dirname } = require('path');

const isAvailable = (moduleName) => {

  // See https://yarnpkg.com/advanced/pnpapi
  if(process.versions.pnp) {
    const pnpApi = require('pnpapi');
    const rootLocator = pnpApi.findPackageLocator('./')
    const rootPgk = pnpApi.getPackageInformation(rootLocator);
    const available = rootPgk.packageDependencies.get(moduleName);
    if (!available) {
      return false;
    }
  }

  try {
    const modulePackagePath = require.resolve(moduleName + '/package.json');
    const modulePath = dirname(modulePackagePath);
    return modulePath;
  } catch (error) {
    console.warn(error);
    return false;
  }
};

const ribaPackages = [
  "@ribajs/bs4",
  "@ribajs/content-slider",
  "@ribajs/core",
  "@ribajs/i18n",
  "@ribajs/leaflet-map",
  "@ribajs/moment",
  "@ribajs/octobercms",
  "@ribajs/photoswipe",
  "@ribajs/shopify",
  "@ribajs/shopify-easdk",
  "@ribajs/shopify-tda",
  "@ribajs/tagged-image",
];

module.exports.isAvailable = isAvailable;
module.exports.ribaPackages = ribaPackages;