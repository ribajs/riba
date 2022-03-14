/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { resolve, dirname } from "path";
import pkgDir from "find-root";

const rootPath = pkgDir(process.cwd());
const { existsSync, lstatSync } = require("fs");

const findDir = (searchPaths: string[]) => {
  let result = null;
  for (let searchPath of searchPaths) {
    if (!result && existsSync(searchPath)) {
      if (!lstatSync(searchPath).isDirectory()) {
        searchPath = dirname(searchPath);
      }
      result = searchPath;
    }
  }
  return result;
};

const findFile = (rootDir: string, searchForFiles: string[]) => {
  let result = null;
  for (let searchPath of searchForFiles) {
    searchPath = resolve(rootDir, searchPath);
    if (!result && existsSync(searchPath) && lstatSync(searchPath).isFile()) {
      result = searchPath;
    }
  }
  return result;
};

export { rootPath, findDir, findFile, resolve, dirname };
