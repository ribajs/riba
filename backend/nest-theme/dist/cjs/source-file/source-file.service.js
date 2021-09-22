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
        this.log = new common_1.Logger(this.constructor.name);
        this.scripts = new Map();
        this.theme = config.get('theme');
        this.dir = (0, path_1.resolve)(this.theme.assetsDir, 'ssr');
    }
    async loadAndSetCache(filename) {
        const path = (0, path_1.resolve)(this.dir, filename);
        const source = await fs_1.promises.readFile(path, 'utf8');
        const stats = await fs_1.promises.stat(path);
        const script = new vm_1.Script(source, {
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
            const stats = await fs_1.promises.stat(file.path);
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
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SourceFileService);
exports.SourceFileService = SourceFileService;
//# sourceMappingURL=source-file.service.js.map