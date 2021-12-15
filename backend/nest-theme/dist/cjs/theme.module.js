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
const http_exception_filter_1 = require("./filters/http-exception.filter");
const config_2 = require("./helper/config");
const path_1 = require("path");
const source_file_service_1 = require("./source-file/source-file.service");
const template_file_service_1 = require("./template-file/template-file.service");
const refresh_cache_service_1 = require("./refresh-cache/refresh-cache.service");
let ThemeModule = ThemeModule_1 = class ThemeModule {
    constructor(config) {
        this.config = config;
    }
    static async register(nestThemeConfig, expressAdapter, env = process.env.NODE_ENV || 'development') {
        const basePath = (0, path_1.resolve)(nestThemeConfig.themeDir, 'config');
        const activeThemeConfig = await (0, config_2.loadConfig)([
            (0, path_1.resolve)(basePath, 'theme.js'),
            (0, path_1.resolve)(basePath, 'theme.ts'),
            (0, path_1.resolve)(basePath, 'theme.yaml'),
        ], env);
        (0, config_2.validateThemeConfig)(activeThemeConfig);
        (0, config_2.validateNestThemeConfig)(nestThemeConfig);
        const fullThemeConfig = {
            ...activeThemeConfig,
            ...nestThemeConfig,
            basePath,
            templateVars: nestThemeConfig.templateVars || new empty_template_vars_1.EmptyTemplateVars(),
            assetsDir: (0, path_1.resolve)(nestThemeConfig.themeDir, activeThemeConfig.assetsDir),
            viewsDir: (0, path_1.resolve)(nestThemeConfig.themeDir, activeThemeConfig.viewsDir),
            pageComponentsDir: (0, path_1.resolve)(nestThemeConfig.themeDir, activeThemeConfig.pageComponentsDir || ''),
        };
        (0, config_2.validateFullThemeConfig)(fullThemeConfig);
        const cacheModule = common_1.CacheModule.register();
        expressAdapter.setViewEngine(fullThemeConfig.viewEngine);
        expressAdapter.useStaticAssets(fullThemeConfig.assetsDir, {});
        expressAdapter.setBaseViewsDir(fullThemeConfig.viewsDir);
        return {
            imports: [
                config_1.ConfigModule.forRoot({
                    load: [(0, config_1.registerAs)('theme', () => fullThemeConfig)],
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
        if (!theme) {
            throw new Error('Theme config not defined!');
        }
        const paths = [];
        if (theme.routes) {
            for (const route of theme.routes) {
                for (const path of route.path) {
                    paths.push({ path, method: common_1.RequestMethod.GET });
                }
            }
        }
        consumer.apply(ssr_middleware_1.SsrMiddleware).forRoutes(...paths);
    }
};
ThemeModule = ThemeModule_1 = __decorate([
    (0, common_1.Module)({
        providers: [
            ssr_service_1.SsrService,
            ssr_middleware_1.SsrMiddleware,
            http_exception_filter_1.HttpExceptionFilterProvider,
            source_file_service_1.SourceFileService,
            template_file_service_1.TemplateFileService,
            refresh_cache_service_1.RefreshCacheService,
            core_1.HttpAdapterHost,
        ],
        controllers: [],
        imports: [],
        exports: [ssr_service_1.SsrService, ssr_middleware_1.SsrMiddleware, source_file_service_1.SourceFileService, refresh_cache_service_1.RefreshCacheService],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService])
], ThemeModule);
exports.ThemeModule = ThemeModule;
//# sourceMappingURL=theme.module.js.map