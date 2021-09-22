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
import { Controller, Get, Param, Res, NotFoundException, Query, } from '@nestjs/common';
import { LunrService } from './lunr.service';
import { ApiTags } from '@nestjs/swagger';
let SearchController = class SearchController {
    constructor(lunr) {
        this.lunr = lunr;
    }
    search(res, namespace, query, limit = 50) {
        let result;
        try {
            result = this.lunr.search(namespace, query);
            if (result.length >= limit) {
                result = result.slice(0, limit);
            }
        }
        catch (error) {
            throw error;
        }
        if (!result) {
            throw new NotFoundException(`[Lunr] No index namespace "${namespace}" found!`);
        }
        return res.json(result);
    }
    searchAll(res, query, limit = 50) {
        let result;
        try {
            result = this.lunr.searchAll(query);
            if (result.length >= limit) {
                result = result.slice(0, limit);
            }
        }
        catch (error) {
            throw error;
        }
        return res.json(result);
    }
};
__decorate([
    Get('/:namespace/:query'),
    __param(0, Res()),
    __param(1, Param('namespace')),
    __param(2, Param('query')),
    __param(3, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, Object]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "search", null);
__decorate([
    Get('/:query'),
    __param(0, Res()),
    __param(1, Param('query')),
    __param(2, Query('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", void 0)
], SearchController.prototype, "searchAll", null);
SearchController = __decorate([
    ApiTags('search'),
    Controller('api/search'),
    __metadata("design:paramtypes", [LunrService])
], SearchController);
export { SearchController };
//# sourceMappingURL=search.controller.js.map