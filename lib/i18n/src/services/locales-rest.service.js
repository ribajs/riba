"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
const locales_base_service_1 = require("./locales-base.service");
/**
 * LocalesRestService get locales object from url
 */
class LocalesRestService extends locales_base_service_1.ALocalesService {
    constructor(url, doNotTranslateDefaultLanguage = false) {
        super(doNotTranslateDefaultLanguage);
        this.url = url;
        this.locales = {};
        this.debug = core_1.Debug('services:LocalesService');
        this.url = url;
        if (!this.url) {
            throw new Error(`Url is requred!`);
        }
        if (LocalesRestService.instances[this.url]) {
            return LocalesRestService.instances[this.url];
        }
        this.init();
        LocalesRestService.instances[this.url] = this;
    }
    static getInstance(url) {
        return LocalesRestService.instances[url];
    }
    /**
     * Get file with all languages
     * @param themeID
     */
    async getAll(url) {
        if (!url) {
            url = this.url;
        }
        if (!url) {
            throw new Error(`Url is requred!`);
        }
        if (window.Shopify.shop) {
            url = url + `?shop=${window.Shopify.shop}`;
        }
        if (this.locales[url]) {
            return this.locales[url];
        }
        return core_1.Utils.getJSON(url)
            .then((locales) => {
            this.locales[url] = locales;
            this.debug('getAll', locales);
            return this.locales[url];
        });
    }
}
exports.LocalesRestService = LocalesRestService;
LocalesRestService.instances = {};
