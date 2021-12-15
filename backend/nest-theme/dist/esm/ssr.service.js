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
import { SsrService as Ssr } from '@ribajs/node-ssr';
import { resolve } from 'path';
let SsrService = class SsrService {
    constructor(config) {
        const theme = config.get('theme');
        if (!theme) {
            throw new Error('Theme config not defined!');
        }
        this.ssr = new Ssr({
            defaultRootTag: theme.ssr?.rootTag,
            defaultTemplateEngine: theme.viewEngine,
            defaultTemplateFile: theme.ssr?.template,
            sourceFileDir: resolve(theme.assetsDir, 'ssr'),
            templateDir: theme.viewsDir,
        });
        this.getSharedContext = this.ssr.getSharedContext.bind(this.ssr);
        this.render = this.ssr.render.bind(this.ssr);
        this.renderComponent = this.ssr.renderComponent.bind(this.ssr);
    }
};
SsrService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], SsrService);
export { SsrService };
//# sourceMappingURL=ssr.service.js.map