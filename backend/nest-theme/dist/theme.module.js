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
var ThemeModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeModule = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const ssr_service_1 = require("./ssr.service");
const ssr_middleware_1 = require("./ssr.middleware");
const empty_template_vars_1 = require("./empty-template-vars");
const config_2 = require("./helper/config");
const path_1 = require("path");
let ThemeModule = ThemeModule_1 = class ThemeModule {
    constructor(adapterHost, config, ssrMiddleware) {
        this.adapterHost = adapterHost;
        this.config = config;
        this.ssrMiddleware = ssrMiddleware;
        this.adapterHost = adapterHost;
        const fullThemeConfig = this.config.get('theme');
        const express = this.adapterHost.httpAdapter;
        express.setViewEngine(fullThemeConfig.viewEngine);
        express.useStaticAssets(fullThemeConfig.assetsDir, {});
        express.setBaseViewsDir(fullThemeConfig.viewsDir);
    }
    static forRoot(nestThemeConfig) {
        const basePath = path_1.resolve(nestThemeConfig.themeDir, 'config');
        const activeThemeConfig = config_2.loadConfig([
            path_1.resolve(basePath, 'theme.ts'),
            path_1.resolve(basePath, 'theme.yaml'),
        ]);
        config_2.validateThemeConfig(activeThemeConfig);
        config_2.validateNestThemeConfig(nestThemeConfig);
        const fullThemeConfig = Object.assign(Object.assign(Object.assign({}, activeThemeConfig), nestThemeConfig), { templateVars: nestThemeConfig.templateVars || new empty_template_vars_1.EmptyTemplateVars(), assetsDir: path_1.resolve(nestThemeConfig.themeDir, activeThemeConfig.assetsDir), viewsDir: path_1.resolve(nestThemeConfig.themeDir, activeThemeConfig.viewsDir), pageComponentsDir: path_1.resolve(nestThemeConfig.themeDir, activeThemeConfig.pageComponentsDir || '') });
        config_2.validateFullThemeConfig(fullThemeConfig);
        return {
            imports: [
                config_1.ConfigModule.forRoot({
                    load: [config_1.registerAs('theme', () => fullThemeConfig)],
                }),
            ],
            module: ThemeModule_1,
            providers: [],
            controllers: [],
            exports: [],
        };
    }
    configure(consumer) {
        const theme = this.config.get('theme');
        if (theme.routes) {
            for (const route of theme.routes) {
                consumer
                    .apply(ssr_middleware_1.SsrMiddleware)
                    .forRoutes({ path: route.path[0], method: common_1.RequestMethod.GET });
            }
        }
    }
};
ThemeModule = ThemeModule_1 = __decorate([
    common_1.Module({
        providers: [ssr_service_1.SsrService, ssr_middleware_1.SsrMiddleware],
        controllers: [],
        exports: [ssr_service_1.SsrService, ssr_middleware_1.SsrMiddleware],
    }),
    __metadata("design:paramtypes", [core_1.HttpAdapterHost,
        config_1.ConfigService,
        ssr_middleware_1.SsrMiddleware])
], ThemeModule);
exports.ThemeModule = ThemeModule;
//# sourceMappingURL=theme.module.js.map