"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@ribajs/core");
class AI18nSwitcherComponent extends core_1.Component {
    constructor(element) {
        super(element);
        this.debug = core_1.Debug('component:' + AI18nSwitcherComponent.tagName);
        this.scope = {
            langcodes: [],
            switch: this.switch,
            toggle: this.toggle,
            ready: false,
        };
        this.debug('constructor', this);
    }
    /**
     * Switch to language by langcode
     * @param langcode
     * @param event
     */
    switch(langcode, context, event) {
        event.preventDefault();
        event.stopPropagation();
        this.debug('switch', langcode);
        if (!langcode.active) {
            this.setLangcode(langcode.code);
        }
    }
    /**
     * Toggle language, makes only sense if you have only two languages
     * @param langcode
     * @param event
     */
    toggle(context, event) {
        event.preventDefault();
        event.stopPropagation();
        this.debug('toggle');
        for (const i in this.scope.langcodes) {
            if (this.scope.langcodes.hasOwnProperty(i)) {
                if (this.scope.langcodes[i].active !== true) {
                    this.debug('toggle active', this.scope.langcodes[i].active, this.scope.langcodes[i].code);
                    this.setLangcode(this.scope.langcodes[i].code);
                    return;
                }
            }
        }
    }
    async init(observedAttributes) {
        if (this.localesService.ready) {
            const langcode = this.localesService.getLangcode();
            if (langcode) {
                return this.initLocales(langcode)
                    .then((langcodes) => {
                    return super.init(observedAttributes);
                });
            }
        }
        return new Promise((resolve, reject) => {
            this.localesService.event.on('ready', (langcode, translationNeeded) => {
                this.initLocales(langcode)
                    .then((langcodes) => {
                    super.init(observedAttributes)
                        .then((view) => {
                        resolve(view);
                    });
                });
            });
        });
    }
    async initLocales(langcode) {
        // set avaible langcodes
        return this.localesService.getAvailableLangcodes()
            .then((langcodes) => {
            this.scope.langcodes = langcodes;
            // set active langcodes
            this.scope.langcodes.forEach((langCode) => {
                langCode.active = (langCode.code === langcode);
            });
            return this.scope.langcodes;
        })
            .then((langcodes) => {
            this.localesService.event.on('changed', (changedLangcode, initial) => {
                // Activate localcode and disable the other
                this.scope.langcodes.forEach((langCode) => {
                    langCode.active = (langCode.code === changedLangcode);
                });
                this.debug('changed', this.scope.langcodes, changedLangcode);
            });
            return langcodes;
        })
            .then((langcodes) => {
            this.scope.ready = true;
            return langcodes;
        });
    }
    setLangcode(langcode) {
        this.debug('setLangcode', langcode);
        this.localesService.setLangcode(langcode);
    }
    async beforeBind() {
        this.debug('beforeBind', this.scope);
    }
    async afterBind() {
        this.debug('afterBind', this.scope);
    }
    requiredAttributes() {
        return [];
    }
    disconnectedCallback() {
        super.disconnectedCallback();
    }
    template() {
        return null;
    }
}
exports.AI18nSwitcherComponent = AI18nSwitcherComponent;
