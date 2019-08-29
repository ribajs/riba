"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vendors_1 = require("../vendors");
const binder_service_1 = require("./binder.service");
const component_service_1 = require("./component.service");
const formatter_service_1 = require("./formatter.service");
class ModulesService {
    /**
     *
     * @param binders;
     */
    constructor(binders, components, formatters) {
        this.debug = vendors_1.Debug('services:ModulesService');
        this.binder = new binder_service_1.BindersService(binders);
        this.component = new component_service_1.ComponentService(components);
        this.formatter = new formatter_service_1.FormatterService(formatters);
    }
    /**
     * Regist a set of binders
     * @param binders
     */
    regist(module) {
        if (module.binders) {
            this.debug('Regist binders; ', module.binders);
            this.binder.regists(module.binders);
        }
        if (module.components) {
            this.debug('Regist components; ', module.components);
            this.component.regists(module.components);
        }
        if (module.formatters) {
            this.debug('Regist formatters; ', module.formatters);
            this.formatter.regists(module.formatters);
        }
    }
}
exports.ModulesService = ModulesService;
