/* jshint esversion: 6 */
const program = require('commander');
const chalk = require('chalk').default;
const exec = require('child_process').execSync;
const path = require('path');
const fs = require('fs');

const GENERAL_PATH = path.join(__dirname, '..', 'package.json');
const GENERAL = require(GENERAL_PATH);

// Riba modules
const PACKAGES = [
  {
    path: 'packages/core/',
    npm: '@ribajs/core',
    available: true,
  },
  {
    path: 'packages/i18n/',
    npm: '@ribajs/i18n',
    available: true,
  },
  {
    path: 'packages/router/',
    npm: '@ribajs/router',
    available: true,
  },
  {
    path: 'packages/bs4/',
    npm: '@ribajs/bs4',
    available: true,
  },
  {
    path: 'packages/shopify/',
    npm: '@ribajs/shopify',
    available: true,
  },
  {
    path: 'packages/shopify-easdk/',
    npm: '@ribajs/shopify-easdk',
    available: true,
  },
  {
    path: 'packages/shopify-tda/',
    npm: '@ribajs/shopify-tda',
    available: true,
  },
  {
    path: 'packages/iconset/',
    npm: '@ribajs/iconset',
    available: true,
  },

  // WIP Riba modules, not ready to publish
  {
    path: 'packages/jquery/',
    npm: '@ribajs/jquery',
    available: true,
  },
  {
    path: 'packages/moment/',
    npm: '@ribajs/moment',
    available: false,
  },

  // Tools, helpers, docs
  {
    path: 'packages/cli/',
    npm: '@ribajs/cli',
    available: true,
  },
  {
    path: 'packages/schematics/',
    npm: '@ribajs/schematics',
    available: true,
  },
  {
    path: 'packages/doc/',
    npm: '@ribajs/doc',
    available: false,
  },

  // Examples
  {
    path: 'examples/each-item/',
    available: false,
  },
  {
    path: 'examples/bs4-tabs-attr/',
    available: false,
  },
  {
    path: 'examples/bs4-tabs-tpl/',
    available: false,
  },
];

const getPackagePath = (modulePath) => {
  return path.join(__dirname, '..', modulePath, 'package.json');
};

const bumpVersion = (modulePath) => {
  const packagePath = getPackagePath(modulePath);
  const package = require(packagePath);

  package.version = GENERAL.version;

  if (package.dependencies) {

    PACKAGES.forEach((dependencyPackage) => {
      if (dependencyPackage.npm && package.dependencies[dependencyPackage.npm]) {
        package.dependencies[dependencyPackage.npm] = "^" + GENERAL.version;
      }
    });
    
    fs.writeFileSync(packagePath, JSON.stringify(package, null, 2) + '\n');
  }
};

const publishPackage = (modulePath) => {
  const packagePath = getPackagePath(modulePath);
  const package = require(packagePath);
  const publishedVersion = getPublishPackageVersion(modulePath, package.name);
  if (package.version === publishedVersion) {
    return console.log(chalk.yellow(`\nSkipped because the current version has already been published`));
  }
  exec('npm publish --access public', {cwd: path.dirname(packagePath), stdio: 'inherit'});
};

const getPublishPackageVersion = (modulePath, moduleNpmName) => {
  const packagePath = getPackagePath(modulePath);
  const version = exec(`npm view ${moduleNpmName} version`, {cwd: path.dirname(packagePath), stdio: 'pipe'});
  return version.toString().trim();
};

// npm i -g npm-upgrade
const upgradePackage = (modulePath) => {
  const packagePath = getPackagePath(modulePath);
  exec('npm-upgrade', {cwd: path.dirname(packagePath), stdio: 'inherit'});
};

const installPackage = (modulePath) => {
  const packagePath = getPackagePath(modulePath);
  exec('npm install', {cwd: path.dirname(packagePath), stdio: 'inherit'});
};

/**
 * Link the package itself
 * @param {string} modulePath 
 */
const linkPackage = (modulePath) => {
  const packagePath = getPackagePath(modulePath);
  exec('npm link', {cwd: path.dirname(packagePath), stdio: 'inherit'});
};

/**
 * Link the riba dependency to the package
 * @param {string} modulePath 
 * @param {string} dependency e.g. @ribajs/core 
 */
const linkPackageDependency = (modulePath, dependency ) => {
  const packagePath = getPackagePath(modulePath);
  exec('npm link ' + dependency, {cwd: path.dirname(packagePath), stdio: 'inherit'});
};

/**
 * Link all used riba dependency to the package
 * @param {string} modulePath 
 */
const linkPackageDependencies = (modulePath) => {
  const packagePath = getPackagePath(modulePath);
  const package = require(packagePath);
  if (package.dependencies) {
    PACKAGES.forEach((dependencyPackage) => {
      if (dependencyPackage.npm && package.dependencies[dependencyPackage.npm]) {
        linkPackageDependency(modulePath, dependencyPackage.npm);
      }
    });
  }
};

const buildPackage = (modulePath) => {
  const packagePath = getPackagePath(modulePath);
  exec('npm run build', {cwd: path.dirname(packagePath), stdio: 'inherit'});
};

/**
 * 
 * @param {string} modulePath 
 * @param {boolean} bump Bump version of riba packages
 * @param {boolean} publish Publish package to npm
 * @param {boolean} upgrade 
 * @param {boolean} install 
 * @param {boolean} link 
 * @param {boolean} linkDependencies 
 * @param {boolean} build 
 */
const processPackage = (modulePath, bump = false, publish = false, upgrade = false, install = false, link = false, linkDependencies = false, build = false) => {
  console.log(chalk.blue(`\nProcess ${modulePath}...`));

  if (!bump && !publish && !upgrade && !install && !link && !linkDependencies && !build) {
    return console.log(chalk.yellow(`\nSkipped`));
  }

  if (bump) {
    bumpVersion(modulePath);
  }

  if (publish) {
    publishPackage(modulePath);
  }

  if (upgrade) {
    upgradePackage(modulePath);
  }

  if (install) {
    installPackage(modulePath);
  }

  if (link) {
    linkPackage(modulePath);
  }

  if (linkDependencies) {
    linkPackageDependencies(modulePath);
  }

  if (build) {
    buildPackage(modulePath);
  }
};

/**
 * 
 * @param {boolean} bump 
 * @param {boolean} publish 
 * @param {boolean} upgrade 
 * @param {boolean} install 
 * @param {boolean} link 
 * @param {boolean} linkDependencies 
 * @param {boolean} build 
 */
const processModules = (bump, publish, upgrade, install, link, linkDependencies, build) => {

  PACKAGES.forEach((package) => {
    processPackage(package.path, bump, package.available && publish, upgrade, install, package.npm && link, linkDependencies, build);
  });

  // Schematics applications
  processPackage('packages/schematics/src/lib/application/files/ts', false, false, upgrade, false, false);

  // root (do not bump this version because it is used as the main version for all other packages)
  processPackage('', false, false, upgrade, install, false);

  // Special case: Reinstall dependencies on core module after all packages are linked
  if (link) {
    processPackage('packages/core/', false, false, false, true, false);
  }
};

program
  .command('bump')
  .description('Bump version to current root version for all packages')
  .action(() => {
    processModules(true);
  });

program
  .command('publish')
  .description('Publish all available packages to npm')
  .action(() => {
    processModules(false, true);
  });

program
  .command('upgrade')
  .description('Upgrade all packages dependencies')
  .action(() => {
    processModules(false, false, true);
  });

program
  .command('install')
  .description('Install all packages dependencies')
  .action(() => {
    processModules(false, false, false, true);
  });

program
  .command('link')
  .description('Link all packages to each other')
  .action(() => {
    // Link each packages itself
    processModules(false, false, false, false, true);
    // Link each riba dependency in each packages
    processModules(false, false, false, false, false, true);
  });

program
  .command('build')
  .description('Build all packages')
  .action(() => {
    processModules(false, false, false, false, false, false, true);
  });

program.parse(process.argv);
