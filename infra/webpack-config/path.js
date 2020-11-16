/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require("path");
const pkgDir = require("pkg-dir");
const rootPath = pkgDir.sync(process.cwd());
const { existsSync, lstatSync } = require("fs");

const findDir = (searchPaths) => {
  let result = null;
  for (let searchPath of searchPaths) {
    if (!result && existsSync(searchPath)) {
      if (!lstatSync(searchPath).isDirectory()) {
        searchPath = path.dirname(searchPath);
      }
      result = searchPath;
    }
  }
  return result;
};

const findFile = (rootDir, searchForFiles) => {
  let result = null;
  for (let searchPath of searchForFiles) {
    searchPath = path.resolve(rootDir, searchPath);
    if (!result && existsSync(searchPath) && lstatSync(searchPath).isFile()) {
      result = searchPath;
    }
  }
  return result;
};

module.exports = {
  path,
  rootPath,
  findDir,
  findFile,
};
