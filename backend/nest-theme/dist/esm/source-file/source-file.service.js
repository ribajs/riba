var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { promises as fs } from 'fs';
import { Script } from 'vm';
let SourceFileService = class SourceFileService {
    constructor(config) {
        const theme = config.get('theme');
        if (!theme) {
            throw new Error('Theme config not defined!');
        }
        this.theme = theme;
        this.dir = resolve(this.theme.assetsDir, 'ssr');
    }
    async load(filename) {
        const path = resolve(this.dir, filename);
        const source = await fs.readFile(path, 'utf8');
        const script = new Script(source, {
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
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], SourceFileService);
export { SourceFileService };
//# sourceMappingURL=source-file.service.js.map