"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const locales_base_service_1 = require("./locales-base.service");
class LocalesStaticService extends locales_base_service_1.ALocalesService {
    constructor(locales, id, doNotTranslateDefaultLanguage = false) {
        super(doNotTranslateDefaultLanguage);
        this.locales = locales;
        this.id = id;
        this.debug = core_1.Debug('services:LocalesStaticService');
        if (!id) {
            id = 'main';
        }
        this.locales = locales;
        if (LocalesStaticService.instances[id]) {
            return LocalesStaticService.instances[id];
        }
        this.init();
        LocalesStaticService.instances[id] = this;
    }
    static getInstance(id = 'main') {
        return LocalesStaticService.instances[id];
    }
    /**
     * Get file with all languages
     * @param themeID
     */
    async getAll(themeID) {
        return this.locales;
    }
}
exports.LocalesStaticService = LocalesStaticService;
LocalesStaticService.instances = {};
