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
exports.SsrService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const node_ssr_1 = require("@ribajs/node-ssr");
const path_1 = require("path");
let SsrService = class SsrService {
    constructor(config) {
        const theme = config.get('theme');
        if (!theme) {
            throw new Error('Theme config not defined!');
        }
        this.ssr = new node_ssr_1.SsrService({
            defaultRootTag: theme.ssr?.rootTag,
            defaultTemplateEngine: theme.viewEngine,
            defaultTemplateFile: theme.ssr?.template,
            sourceFileDir: (0, path_1.resolve)(theme.assetsDir, 'ssr'),
            templateDir: theme.viewsDir,
        });
        this.getSharedContext = this.ssr.getSharedContext.bind(this.ssr);
        this.render = this.ssr.render.bind(this.ssr);
        this.renderComponent = this.ssr.renderComponent.bind(this.ssr);
        this.logOutput = this.ssr.logOutput.bind(this.ssr);
        this.logToErrorMessage = this.ssr.logToErrorMessage.bind(this.ssr);
    }
};
SsrService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SsrService);
exports.SsrService = SsrService;
//# sourceMappingURL=ssr.service.js.map