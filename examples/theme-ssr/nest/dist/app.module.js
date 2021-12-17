"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const config_2 = require("./config/config");
const nest_theme_1 = require("@ribajs/nest-theme");
let AppModule = AppModule_1 = class AppModule {
    static register(expressAdapter) {
        return {
            module: AppModule_1,
            imports: [
                config_1.ConfigModule.forRoot({
                    load: [config_2.appConfig],
                }),
                nest_theme_1.ThemeModule.register(config_2.theme, expressAdapter),
            ],
            controllers: [],
            providers: [config_1.ConfigService],
        };
    }
};
AppModule = AppModule_1 = __decorate([
    (0, common_1.Module)({})
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map