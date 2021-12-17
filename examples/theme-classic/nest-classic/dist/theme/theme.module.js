"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThemeModule = void 0;
const common_1 = require("@nestjs/common");
const page_service_1 = require("./page/page.service");
const page_controller_1 = require("./page/page.controller");
const index_service_1 = require("./index/index.service");
const index_controller_1 = require("./index/index.controller");
const global_service_1 = require("./global/global.service");
const link_list_service_1 = require("./link-list/link-list.service");
let ThemeModule = class ThemeModule {
};
ThemeModule = __decorate([
    (0, common_1.Module)({
        providers: [page_service_1.PageService, index_service_1.IndexService, global_service_1.GlobalService, link_list_service_1.LinkListService],
        controllers: [page_controller_1.PageController, index_controller_1.IndexController],
    })
], ThemeModule);
exports.ThemeModule = ThemeModule;
//# sourceMappingURL=theme.module.js.map