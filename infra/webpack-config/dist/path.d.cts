/// <reference types="node" />
import { resolve, dirname } from "path";
declare const rootPath: string;
declare const findDir: (searchPaths: string[]) => string | null;
declare const findFile: (rootDir: string, searchForFiles: string[]) => string | null;
export { rootPath, findDir, findFile, resolve, dirname };
