"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LunrModule = void 0;
const common_1 = require("@nestjs/common");
const lunr_service_1 = require("./lunr.service");
const suggest_service_1 = require("./suggest/suggest.service");
let LunrModule = class LunrModule {
};
LunrModule = __decorate([
    common_1.Module({
        providers: [lunr_service_1.LunrService, suggest_service_1.SuggestService],
        controllers: [],
        exports: [lunr_service_1.LunrService],
    })
], LunrModule);
exports.LunrModule = LunrModule;
//# sourceMappingURL=lunr.module.js.map