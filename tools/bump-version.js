const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const generalPath = path.join(__dirname, '..', 'package.json');
const general = require(generalPath);

const log = function (error, stdout, stderr) {
  console.log(stdout);
  console.error(stderr);
  if (error !== null) {
    console.error('exec error: ' + error);
  }
};

const updateModule = (modulePath, publish = false) => {
  const packagePath = path.join(__dirname, '..', modulePath, 'package.json');
  const package = require(packagePath);

  package.version = general.version;

  if (package.dependencies) {
    if (package.dependencies['@ribajs/core']) {
      package.dependencies['@ribajs/core'] = "^" + general.version;
    }
    if (package.dependencies['@ribajs/i18n']) {
      package.dependencies['@ribajs/i18n'] = "^" + general.version;
    }
    if (package.dependencies['@ribajs/router']) {
      package.dependencies['@ribajs/router'] = "^" + general.version;
    }
    if (package.dependencies['@ribajs/jquery']) {
      package.dependencies['@ribajs/jquery'] = "^" + general.version;
    }
    if (package.dependencies['@ribajs/bs4']) {
      package.dependencies['@ribajs/bs4'] = "^" + general.version;
    }
    if (package.dependencies['@ribajs/moment']) {
      package.dependencies['@ribajs/moment'] = "^" + general.version;
    }
    if (package.dependencies['@ribajs/shopify']) {
      package.dependencies['@ribajs/shopify'] = "^" + general.version;
    }
    if (package.dependencies['@ribajs/shopify-easdk']) {
      package.dependencies['@ribajs/shopify-easdk'] = "^" + general.version;
    }
    if (package.dependencies['@ribajs/shopify-tda']) {
      package.dependencies['@ribajs/shopify-tda'] = "^" + general.version;
    }
    
    fs.writeFileSync(packagePath, JSON.stringify(package, null, 2));

    if (publish && process.argv[2] && process.argv[2] === '--publish') {
      exec(`npm publish`, {cwd: path.dirname(packagePath)}, log);
    }
    
  }
}

// Riba modules
updateModule('packages/core/', true);
updateModule('packages/bs4/', true);
updateModule('packages/i18n/', true);
updateModule('packages/router/', true);
updateModule('packages/shopify/', true);
updateModule('packages/shopify-easdk/', true);
updateModule('packages/shopify-tda/', true);

// WIP Riba modules, not ready to publish
updateModule('packages/jquery/', false);
updateModule('packages/moment/', false);

// Examples
updateModule('docs/reference/binders/each-star/', false);