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
import { Module, RequestMethod, CacheModule, } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ConfigModule, registerAs, ConfigService } from '@nestjs/config';
import { SsrService } from './ssr.service';
import { SsrMiddleware } from './ssr.middleware';
import { EmptyTemplateVars } from './empty-template-vars';
import { HttpExceptionFilterProvider } from './filters/http-exception.filter';
import { loadConfig, validateThemeConfig, validateNestThemeConfig, validateFullThemeConfig, } from './helper/config';
import { resolve } from 'path';
import { SourceFileService } from './source-file/source-file.service';
import { TemplateFileService } from './template-file/template-file.service';
import { RefreshCacheService } from './refresh-cache/refresh-cache.service';
let ThemeModule = ThemeModule_1 = class ThemeModule {
    constructor(adapterHost, config, ssrMiddleware) {
        this.adapterHost = adapterHost;
        this.config = config;
        this.ssrMiddleware = ssrMiddleware;
    }
    static register(nestThemeConfig, expressAdapter, env = process.env.NODE_ENV) {
        const basePath = resolve(nestThemeConfig.themeDir, 'config');
        const activeThemeConfig = loadConfig([resolve(basePath, 'theme.ts'), resolve(basePath, 'theme.yaml')], env);
        validateThemeConfig(activeThemeConfig);
        validateNestThemeConfig(nestThemeConfig);
        const fullThemeConfig = Object.assign(Object.assign(Object.assign({}, activeThemeConfig), nestThemeConfig), { basePath, templateVars: nestThemeConfig.templateVars || new EmptyTemplateVars(), assetsDir: resolve(nestThemeConfig.themeDir, activeThemeConfig.assetsDir), viewsDir: resolve(nestThemeConfig.themeDir, activeThemeConfig.viewsDir), pageComponentsDir: resolve(nestThemeConfig.themeDir, activeThemeConfig.pageComponentsDir || '') });
        validateFullThemeConfig(fullThemeConfig);
        const cacheModule = CacheModule.register();
        expressAdapter.setViewEngine(fullThemeConfig.viewEngine);
        expressAdapter.useStaticAssets(fullThemeConfig.assetsDir, {});
        expressAdapter.setBaseViewsDir(fullThemeConfig.viewsDir);
        return {
            imports: [
                ConfigModule.forRoot({
                    load: [registerAs('theme', () => fullThemeConfig)],
                }),
                cacheModule,
            ],
            module: ThemeModule_1,
            providers: [],
            controllers: [],
            exports: [cacheModule],
        };
    }
    configure(consumer) {
        const theme = this.config.get('theme');
        const paths = [];
        if (theme.routes) {
            for (const route of theme.routes) {
                for (const path of route.path) {
                    paths.push({ path, method: RequestMethod.GET });
                }
            }
        }
        consumer.apply(SsrMiddleware).forRoutes(...paths);
    }
};
ThemeModule = ThemeModule_1 = __decorate([
    Module({
        providers: [
            SsrService,
            SsrMiddleware,
            HttpExceptionFilterProvider,
            SourceFileService,
            TemplateFileService,
            RefreshCacheService,
            HttpAdapterHost,
        ],
        controllers: [],
        imports: [],
        exports: [SsrService, SsrMiddleware, SourceFileService, RefreshCacheService],
    }),
    __metadata("design:paramtypes", [HttpAdapterHost,
        ConfigService,
        SsrMiddleware])
], ThemeModule);
export { ThemeModule };
//# sourceMappingURL=theme.module.js.map