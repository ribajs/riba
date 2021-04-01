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
exports.LunrController = void 0;
const common_1 = require("@nestjs/common");
const lunr_service_1 = require("./lunr.service");
let LunrController = class LunrController {
    constructor(lunr) {
        this.lunr = lunr;
    }
    search(res, namespace, query) {
        const index = this.lunr.getIndex(namespace);
        if (!index) {
            throw new common_1.NotFoundException(`[Lunr] No index namespace "${namespace}" found!`);
        }
        const result = index.search(query);
        return res.json(result);
    }
};
__decorate([
    common_1.Get('/search/:namespace/:query'),
    __param(0, common_1.Res()),
    __param(1, common_1.Param('namespace')),
    __param(2, common_1.Param('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", void 0)
], LunrController.prototype, "search", null);
LunrController = __decorate([
    common_1.Controller('lunr'),
    __metadata("design:paramtypes", [lunr_service_1.LunrService])
], LunrController);
exports.LunrController = LunrController;
//# sourceMappingURL=lunr.controller.js.map