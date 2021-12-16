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
const config_1 = require("@nestjs/config");
const ssr_service_1 = require("./ssr.service");
const ssr_middleware_1 = require("./ssr.middleware");
let ThemeModule = ThemeModule_1 = class ThemeModule {
    constructor(config, ssrMiddleware) {
        this.config = config;
        this.ssrMiddleware = ssrMiddleware;
    }
    static forRoot(themeConfig) {
        return {
            imports: [
                config_1.ConfigModule.forRoot({
                    load: [config_1.registerAs('theme', () => themeConfig)],
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
        for (const route of theme.routes) {
            consumer
                .apply(ssr_middleware_1.SsrMiddleware)
                .forRoutes({ path: route.path[0], method: common_1.RequestMethod.GET });
        }
    }
};
ThemeModule = ThemeModule_1 = __decorate([
    common_1.Module({
        providers: [ssr_service_1.SsrService, ssr_middleware_1.SsrMiddleware],
        controllers: [],
        exports: [],
    }),
    __metadata("design:paramtypes", [config_1.ConfigService,
        ssr_middleware_1.SsrMiddleware])
], ThemeModule);
exports.ThemeModule = ThemeModule;
//# sourceMappingURL=theme.module.js.map