var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { resolve } from 'path';
import { promises as fs } from 'fs';
import { Script } from 'vm';
let SourceFileService = class SourceFileService {
    constructor(config) {
        this.theme = config.get('theme');
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
        var e_1, _a;
        const sourceFiles = [];
        try {
            for (var filenames_1 = __asyncValues(filenames), filenames_1_1; filenames_1_1 = await filenames_1.next(), !filenames_1_1.done;) {
                const filename = filenames_1_1.value;
                sourceFiles.push(await this.load(filename));
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (filenames_1_1 && !filenames_1_1.done && (_a = filenames_1.return)) await _a.call(filenames_1);
            }
            finally { if (e_1) throw e_1.error; }
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