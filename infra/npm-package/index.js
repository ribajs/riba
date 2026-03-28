import { dirname } from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);

export const isAvailable = (moduleName) => {
  // See https://yarnpkg.com/advanced/pnpapi
  if (process.versions.pnp) {
    try {
      const pnpApi = require("pnpapi");
      const rootLocator = pnpApi.findPackageLocator("./");
      const rootPkg = pnpApi.getPackageInformation(rootLocator);
      const available = rootPkg.packageDependencies.get(moduleName);
      if (!available) {
        return false;
      }
    } catch {
      // pnpapi not available
    }
  }

  try {
    const modulePackagePath = require.resolve(moduleName + "/package.json");
    const modulePath = dirname(modulePackagePath);
    return modulePath;
  } catch {
    return false;
  }
};

export const ribaPackages = [
  "@ribajs/bs5",
  "@ribajs/content-slider",
  "@ribajs/core",
  "@ribajs/iconset",
  "@ribajs/i18n",
  "@ribajs/leaflet-map",
  "@ribajs/moment",
  "@ribajs/octobercms",
  "@ribajs/photoswipe",
  "@ribajs/shopify",
  "@ribajs/shopify-easdk",
  "@ribajs/shopify-tda",
  "@ribajs/artcodestudio",
];
