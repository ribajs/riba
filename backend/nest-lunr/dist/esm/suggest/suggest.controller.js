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
import { Controller, Get, Res, Param } from '@nestjs/common';
import { SuggestService } from './suggest.service';
import { ApiTags } from '@nestjs/swagger';
let SuggestController = class SuggestController {
    constructor(suggest) {
        this.suggest = suggest;
    }
    async suggestion(res, namespace, word) {
        let result;
        try {
            result = this.suggest.suggest(namespace, word);
        }
        catch (error) {
            throw error;
        }
        return res.json(result);
    }
    async allSuggestions(res, word) {
        let result;
        try {
            result = this.suggest.suggestAll(word);
        }
        catch (error) {
            throw error;
        }
        return res.json(result);
    }
};
__decorate([
    Get('/:namespace/:word'),
    __param(0, Res()),
    __param(1, Param('namespace')),
    __param(2, Param('word')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SuggestController.prototype, "suggestion", null);
__decorate([
    Get('/:word'),
    __param(0, Res()),
    __param(1, Param('word')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], SuggestController.prototype, "allSuggestions", null);
SuggestController = __decorate([
    ApiTags('suggestions'),
    Controller('api/suggest'),
    __metadata("design:paramtypes", [SuggestService])
], SuggestController);
export { SuggestController };
//# sourceMappingURL=suggest.controller.js.map