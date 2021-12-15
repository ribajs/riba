"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SourceFileService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const fs_1 = require("fs");
const vm_1 = require("vm");
let SourceFileService = class SourceFileService {
    constructor(config) {
        const theme = config.get('theme');
        if (!theme) {
            throw new Error('Theme config not defined!');
        }
        this.theme = theme;
        this.dir = (0, path_1.resolve)(this.theme.assetsDir, 'ssr');
    }
    async load(filename) {
        const path = (0, path_1.resolve)(this.dir, filename);
        const source = await fs_1.promises.readFile(path, 'utf8');
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
};
SourceFileService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SourceFileService);
exports.SourceFileService = SourceFileService;
//# sourceMappingURL=source-file.service.js.map