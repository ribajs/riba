"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
class ALocalesService {
    constructor(doNotTranslateDefaultLanguage) {
        this.doNotTranslateDefaultLanguage = doNotTranslateDefaultLanguage;
        this.event = new core_1.EventDispatcher('i18n');
        this._ready = false;
        this.debug = core_1.Debug('services:ALocalesService');
    }
    get ready() {
        return this._ready;
    }
    /**
     * Get translation by properties, e.g. `de.form.newsletter_label`
     * Properties object must include the language code, e.g. `de`.
     * @param properties properties, e.g. `['de', 'form', 'newsletter', 'label']`
     * @param force Set this to true if you want to force the request also if the service is not ready, you should use this only one the time
     */
    async get(properties, vars, force = false) {
        if (!this.ready && !force) {
            throw new Error('not ready');
        }
        return this.getAll()
            // extract properties
            .then((locals) => {
            if (properties && properties.length) {
                let local = core_1.Utils.clone(true, locals);
                for (const property of properties) {
                    if (!property) {
                        return;
                    }
                    if (local[property]) {
                        local = local[property];
                    }
                    else {
                        return null;
                    }
                }
                return local;
            }
            return locals;
        })
            .then((local) => {
            if (local === null && properties) {
                this.debug(`WARNING translation missing: "${properties.join('.')}"`, local, properties);
            }
            return local;
        })
            // Replace variables in local string if vars are set
            .then((local) => {
            if (vars) {
                local = this.setTranslateStringPluralization(local, vars);
                local = this.setTranslateStringVars(local, vars);
            }
            return local;
        })
            .catch((error) => {
            console.error(error);
            this._ready = false;
            return error;
        });
    }
    /**
     * Get translation by properties, e.g. `form.newsletter_label`
     * Properties object must not include the language code.
     * @param properties properties, e.g. `[form', 'newsletter', 'label']`
     */
    async getByCurrentLang(properties = [], vars) {
        const langcode = this.getLangcode();
        if (!langcode) {
            throw new Error('Langcode not found in html tag');
        }
        return this.get([langcode, ...properties], vars);
    }
    getBrowserLangcode() {
        const lang = navigator.language || navigator.userLanguage;
        const simplified = lang.split('-')[0].toLowerCase();
        return simplified;
    }
    getHTMLLangcode() {
        const langcode = document.documentElement ? document.documentElement.lang : 'en';
        return langcode;
    }
    /**
     * Get the current langcode,
     * if lang was not choosed this is the langcode of the lang attribute of the html element.
     * If the language was changed this returns the changed language
     */
    getLangcode() {
        return this.currentLangcode;
    }
    getInitialLangcode() {
        return this.initalLangcode;
    }
    setLangcode(langcode, initial = false) {
        if (this.currentLangcode !== langcode) {
            this.debug('setLangcode', langcode, this.currentLangcode);
            this.currentLangcode = langcode;
            // $('html').attr('lang', langcode);
            if (document.documentElement) {
                document.documentElement.lang = langcode;
            }
            this.event.trigger('changed', langcode, initial);
        }
    }
    async getAvailableLangcodes() {
        const activeCode = this.getLangcode();
        return this.get(undefined, undefined, true)
            .then((locals) => {
            const langcodes = [];
            Object.keys(locals).forEach((langcode) => {
                langcodes.push({
                    code: langcode,
                    active: langcode === activeCode,
                });
            });
            return langcodes;
        });
    }
    /**
     * Parse templates wich can be used to set variables on language strings
     */
    parseTemplateVars($el) {
        const templates = $el.find('template');
        const vars = {};
        templates.each((i, template) => {
            const name = template.getAttribute('name');
            if (name !== null) {
                vars[name] = template.innerHTML.trim();
            }
        });
        return vars;
    }
    /**
     * Parse templates wich have his own translations
     */
    parseLocalVars($el) {
        const templates = $el.find('template');
        const vars = {};
        templates.each((i, template) => {
            const lang = template.getAttribute('lang');
            if (lang !== null) {
                vars[lang] = template.innerHTML.trim();
            }
        });
        return vars;
    }
    /**
     * Replace variables on translated string
     * @param translateString
     * @param vars
     */
    setTranslateStringVars(translateString, vars) {
        if (!translateString || Object.keys(vars).length === 0 || typeof (translateString.match) !== 'function') {
            return translateString;
        }
        this.debug('setTranslateStringVars', translateString, vars);
        const matches = translateString.match(/{{\s*?[A-Za-z0-9_-]+\s*?}}/gm);
        if (matches) {
            for (const match of matches) {
                if (match) {
                    const varName = match.replace(/{{\s*|\s*}}/gm, '');
                    if (typeof (vars[varName]) === 'string' || typeof (vars[varName]) === 'number') {
                        translateString = translateString.replace(match, vars[varName]);
                    }
                }
            }
        }
        this.debug('setTranslateStringVars', translateString);
        return translateString;
    }
    async init() {
        this.initalLangcode = this.getHTMLLangcode();
        this.currentLangcode = this.initalLangcode;
        if (!this.initalLangcode) {
            throw new Error(`The lang attribute on the html element is requred to detect the default theme language: ${this.initalLangcode}`);
        }
        // Detect browser language and switch to this language when available
        const browserLangcode = this.getBrowserLangcode();
        return this.getAvailableLangcodes()
            .then((availableLangcodes) => {
            let browserLangFound = false;
            for (const availableLangcodeObj of availableLangcodes) {
                if (availableLangcodeObj.code === browserLangcode) {
                    browserLangFound = true;
                }
            }
            // only switch language if the browser language is not the default language (if doNotTranslateDefaultLanguage is true)
            if (!this.doNotTranslateDefaultLanguage || (browserLangFound && browserLangcode !== this.currentLangcode)) {
                this.setLangcode(browserLangcode, true);
            }
            return availableLangcodes;
        })
            .then((availableLangcodes) => {
            this._ready = true;
            // If the current langcode is not the inital langcode then translation is needed
            const translationNeeded = this.currentLangcode !== this.initalLangcode || !this.doNotTranslateDefaultLanguage;
            this.event.trigger('ready', this.currentLangcode, translationNeeded);
        })
            .catch((error) => {
            console.error(error);
            this._ready = false;
            return error;
        });
    }
    /**
     * see https://help.shopify.com/en/themes/development/theme-store-requirements/internationalizing/translation-filter#pluralization-in-translation-keys
     * @param translateString
     * @param vars
     */
    setTranslateStringPluralization(translateObj, vars) {
        if (vars.count && typeof (translateObj) === 'object' && translateObj !== null) {
            const count = Number(vars.count);
            if (count === 0) {
                if (translateObj.zero) {
                    return translateObj.zero;
                }
            }
            else if (count === 1) {
                if (translateObj.one) {
                    return translateObj.one;
                }
            }
            else if (count === 2) {
                if (translateObj.two) {
                    return translateObj.two;
                }
            }
        }
        if (typeof (translateObj) === 'object' && translateObj !== null && translateObj.other) {
            return translateObj.other;
        }
        return translateObj;
    }
}
exports.ALocalesService = ALocalesService;
