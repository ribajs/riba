const exec = require('child_process').exec;
const path = require('path');
const fs = require('fs');

const corePath = path.join(__dirname, '..', 'packages/core/package.json');
const core = require(corePath);

const generalPath = path.join(__dirname, '..', 'package.json');
const general = require(generalPath);

const bs4Path = path.join(__dirname, '..', 'packages/bs4/package.json');
const bs4 = require(bs4Path);

const jqueryPath = path.join(__dirname, '..', 'packages/jquery/package.json');
const jquery = require(jqueryPath);

const i18nPath = path.join(__dirname, '..', 'packages/i18n/package.json');
const i18n = require(i18nPath);

const momentPath = path.join(__dirname, '..', 'packages/moment/package.json');
const moment = require(momentPath);

const routerPath = path.join(__dirname, '..', 'packages/router/package.json');
const router = require(routerPath);

const shopifyPath = path.join(__dirname, '..', 'packages/shopify/package.json');
const shopify = require(shopifyPath);

const shopifyEasdkPath = path.join(__dirname, '..', 'packages/shopify-easdk/package.json');
const shopifyEasdk = require(shopifyEasdkPath);

const shopifyTdaPath = path.join(__dirname, '..', 'packages/shopify-tda/package.json');
const shopifyTda = require(shopifyTdaPath);

const exampleEachStarPath = path.join(__dirname, '..', 'examples/binders/each-star/package.json');
const exampleEachStar = require(exampleEachStarPath);

console.log('Upgrade packages to v' + general.version);

core.version = general.version;

bs4.version = general.version;
bs4.dependencies['@ribajs/core'] = "^" + general.version;

jquery.version = general.version;
jquery.dependencies['@ribajs/core'] = "^" + general.version;

i18n.version = general.version;
i18n.dependencies['@ribajs/core'] = "^" + general.version;

moment.version = general.version;
moment.dependencies['@ribajs/core'] = "^" + general.version;

router.version = general.version;
router.dependencies['@ribajs/core'] = "^" + general.version;

shopify.version = general.version;
shopify.dependencies['@ribajs/core'] = "^" + general.version;
shopify.dependencies['@ribajs/i18n'] = "^" + general.version;

shopifyEasdk.version = general.version;
shopifyEasdk.dependencies['@ribajs/core'] = "^" + general.version;
shopifyEasdk.dependencies['@ribajs/router'] = "^" + general.version;

shopifyTda.version = general.version;
shopifyTda.dependencies['@ribajs/core'] = "^" + general.version;
shopifyTda.dependencies['@ribajs/i18n'] = "^" + general.version;
shopifyTda.dependencies['@ribajs/shopify'] = "^" + general.version;


exampleEachStar.version = general.version;

fs.writeFileSync(corePath, JSON.stringify(core, null, 2));
fs.writeFileSync(bs4Path, JSON.stringify(bs4, null, 2));
fs.writeFileSync(jqueryPath, JSON.stringify(jquery, null, 2));
fs.writeFileSync(i18nPath, JSON.stringify(i18n, null, 2));
fs.writeFileSync(momentPath, JSON.stringify(moment, null, 2));
fs.writeFileSync(routerPath, JSON.stringify(router, null, 2));
fs.writeFileSync(shopifyPath, JSON.stringify(shopify, null, 2));
fs.writeFileSync(shopifyEasdkPath, JSON.stringify(shopifyEasdk, null, 2));
fs.writeFileSync(shopifyTdaPath, JSON.stringify(shopifyTda, null, 2));

fs.writeFileSync(exampleEachStarPath, JSON.stringify(exampleEachStar, null, 2));

const log = function (error, stdout, stderr) {
  console.log(stdout);
  console.error(stderr);
  if (error !== null) {
    console.error('exec error: ' + error);
  }
};

// exec(`npm publish`, {cwd: path.dirname(bs4Path)}, log);
// exec(`npm publish`, {cwd: path.dirname(jqueryPath)}, log);
exec(`npm publish`, {cwd: path.dirname(corePath)}, log);
exec(`npm publish`, {cwd: path.dirname(i18nPath)}, log);
// exec(`npm publish`, {cwd: path.dirname(momentPath)}, log);
exec(`npm publish`, {cwd: path.dirname(routerPath)}, log);
exec(`npm publish`, {cwd: path.dirname(shopifyPath)}, log);
exec(`npm publish`, {cwd: path.dirname(shopifyEasdkPath)}, log);
exec(`npm publish`, {cwd: path.dirname(shopifyTdaPath)}, log);
