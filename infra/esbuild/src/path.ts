/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
import { resolve, dirname, basename, extname } from "path";
import findRoot from "find-root";
import { existsSync, lstatSync } from "fs";

export const rootPath = findRoot(process.cwd());

export const findDir = (searchPaths: string[]) => {
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

export const findFile = (rootDir: string, searchForFiles: string[]) => {
  let result = null;
  for (let searchPath of searchForFiles) {
    searchPath = resolve(rootDir, searchPath);
    if (!result && existsSync(searchPath) && lstatSync(searchPath).isFile()) {
      result = searchPath;
    }
  }
  return result;
};

export { resolve, dirname, basename, extname };
