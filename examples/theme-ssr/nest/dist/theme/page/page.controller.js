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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageController = void 0;
const common_1 = require("@nestjs/common");
const global_service_1 = require("../global/global.service");
const page_service_1 = require("./page.service");
const ssr_service_1 = require("../ssr.service");
let PageController = class PageController {
    constructor(global, page, ssr) {
        this.global = global;
        this.page = page;
        this.ssr = ssr;
        this.log = new common_1.Logger(this.constructor.name);
    }
    async index(res) {
        const variables = Object.assign(Object.assign({}, this.global.get()), this.page.get('index'));
        this.log.debug('PageController');
        try {
            const page = await this.ssr.renderComponent({
                engine: 'happy-dom',
                placeholderPageTag: 'page-component',
                templatePath: 'page-component.pug',
                pageComponentPath: 'index/index.page-component.ts',
                componentTagName: 'index-page',
                variables,
            });
            return res.send(page.html);
        }
        catch (error) {
            this.log.error(error);
            return res.status(500).json(error);
        }
    }
};
__decorate([
    common_1.Get(),
    __param(0, common_1.Res()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PageController.prototype, "index", null);
PageController = __decorate([
    common_1.Controller(),
    __metadata("design:paramtypes", [global_service_1.GlobalService,
        page_service_1.PageService,
        ssr_service_1.Ssr])
], PageController);
exports.PageController = PageController;
//# sourceMappingURL=page.controller.js.map