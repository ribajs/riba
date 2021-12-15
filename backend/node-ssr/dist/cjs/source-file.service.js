"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileService = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const vm_1 = require("vm");
class SourceFileService {
    constructor(dir) {
        this.dir = dir;
    }
    async load(filename) {
        const path = (0, path_1.resolve)(this.dir, filename);
        const source = await fs_1.promises.readFile(path, "utf8");
        const script = new vm_1.Script(source, {
            filename,
        });
        return {
            source,
            script,
            filename,
            path,
        };
    }
    async loads(filenames) {
        const sourceFiles = [];
        for await (const filename of filenames) {
            sourceFiles.push(await this.load(filename));
        }
        return sourceFiles;
    }
}
exports.SourceFileService = SourceFileService;
//# sourceMappingURL=source-file.service.js.map