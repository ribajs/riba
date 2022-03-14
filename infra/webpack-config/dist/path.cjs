"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dirname = exports.resolve = exports.findFile = exports.findDir = exports.rootPath = void 0;
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path_1 = require("path");
Object.defineProperty(exports, "resolve", { enumerable: true, get: function () { return path_1.resolve; } });
Object.defineProperty(exports, "dirname", { enumerable: true, get: function () { return path_1.dirname; } });
const find_root_1 = __importDefault(require("find-root"));
const rootPath = (0, find_root_1.default)(process.cwd());
exports.rootPath = rootPath;
const { existsSync, lstatSync } = require("fs");
const findDir = (searchPaths) => {
    let result = null;
    for (let searchPath of searchPaths) {
        if (!result && existsSync(searchPath)) {
            if (!lstatSync(searchPath).isDirectory()) {
                searchPath = (0, path_1.dirname)(searchPath);
            }
            result = searchPath;
        }
    }
    return result;
};
exports.findDir = findDir;
const findFile = (rootDir, searchForFiles) => {
    let result = null;
    for (let searchPath of searchForFiles) {
        searchPath = (0, path_1.resolve)(rootDir, searchPath);
        if (!result && existsSync(searchPath) && lstatSync(searchPath).isFile()) {
            result = searchPath;
        }
    }
    return result;
};
exports.findFile = findFile;
