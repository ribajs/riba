var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { promises as fs } from 'fs';
import { Script } from 'vm';
let SourceFileService = class SourceFileService {
    constructor(config) {
        this.log = new Logger(this.constructor.name);
        this.scripts = new Map();
        this.theme = config.get('theme');
        this.dir = resolve(this.theme.assetsDir, 'ssr');
    }
    async loadAndSetCache(filename) {
        const path = resolve(this.dir, filename);
        const source = await fs.readFile(path, 'utf8');
        const stats = await fs.stat(path);
        const script = new Script(source, {
            filename,
        });
        this.scripts.set(filename, {
            source,
            script,
            filename,
            path,
            stats,
        });
        return this.scripts.get(filename);
    }
    async load(filename) {
        if (this.scripts.has(filename)) {
            const file = this.scripts.get(filename);
            const stats = await fs.stat(file.path);
            if (file.stats.mtimeMs === stats.mtimeMs) {
                this.log.debug(`Source ${filename} from cache`);
                return file;
            }
            else {
                this.log.debug(`Source ${filename} has been change, refresh cache`);
                return this.loadAndSetCache(filename);
            }
        }
        this.log.debug(`Source ${filename} currently not cached, add them to cache`);
        return this.loadAndSetCache(filename);
    }
    async loads(filenames) {
        for (const filename of filenames) {
            await this.load(filename);
        }
        return filenames.map((filename) => this.scripts.get(filename));
    }
};
SourceFileService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], SourceFileService);
export { SourceFileService };
//# sourceMappingURL=source-file.service.js.map