"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = require("@ribajs/i18n");
const base_service_1 = require("./base.service");
class LocalesService extends i18n_1.LocalesRestService {
    constructor() {
        let url = `${base_service_1.BaseService.baseUrl}/shopify/api/themes/${window.Shopify.theme.id}/locales`;
        if (window.Shopify.shop) {
            url += `?shop=${window.Shopify.shop}`;
        }
        super(url, true);
        if (LocalesService.instance) {
            return LocalesService.instance;
        }
        LocalesService.instance = this;
    }
    static getInstance() {
        return this.instance;
    }
}
exports.LocalesService = LocalesService;
