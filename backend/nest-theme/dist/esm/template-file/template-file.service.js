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
import { resolve, extname } from 'path';
import * as consolidate from 'consolidate';
let TemplateFileService = class TemplateFileService {
    constructor(config) {
        this.log = new Logger(this.constructor.name);
        this.theme = config.get('theme');
        this.dir = this.theme.viewsDir;
        this.defaultEngine = this.theme.viewEngine;
    }
    getEngine(templatePath) {
        const ext = extname(templatePath);
        const detected = (ext === null || ext === void 0 ? void 0 : ext.substring(1)) || this.defaultEngine;
        if (detected !== this.defaultEngine) {
            this.log.warn(`Detected template engine is not the default: "${detected}" (Default: "${this.defaultEngine}")'`);
        }
        try {
            require.resolve(detected);
        }
        catch (error) {
            this.log.error(`Template engine not installed, try to run "yarn add ${detected}"`);
        }
        return detected;
    }
    normalizePath(path) {
        if (!extname(path)) {
            path = path + '.' + this.defaultEngine;
        }
        if (!path.startsWith(this.dir)) {
            path = resolve(this.dir, path);
        }
        return path;
    }
    transform(layout, rootTag, componentTagName) {
        layout = layout.replace(new RegExp(rootTag, 'gi'), componentTagName);
        return layout;
    }
    async load(path, rootTag, componentTagName, variables = {}) {
        path = this.normalizePath(path);
        const engine = this.getEngine(path);
        try {
            let layout = await consolidate[engine](path, variables);
            layout = this.transform(layout, rootTag, componentTagName);
            return {
                engine,
                layout,
                path,
            };
        }
        catch (error) {
            this.log.error(error);
            throw error;
        }
    }
};
TemplateFileService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], TemplateFileService);
export { TemplateFileService };
//# sourceMappingURL=template-file.service.js.map