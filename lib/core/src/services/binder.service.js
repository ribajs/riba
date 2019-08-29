"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_element_service_1 = require("./module-element.service");
class BindersService extends module_element_service_1.ModuleElementService {
    /**
     *
     * @param binders;
     */
    constructor(binders) {
        super(binders);
        this.type = 'binder';
    }
    /**
     * Regist a binder
     * @param binder
     * @param name  Overwrites the name to access the binder over
     */
    regist(binder, fallbackName, forceFallback = false) {
        if (!binder || typeof (binder.routine) !== 'function') {
            this.debug(new Error('Can not regist binder!'), binder);
            return this.elements;
        }
        const name = forceFallback ? fallbackName || binder.name : binder.name || fallbackName;
        if (!name) {
            console.warn(new Error('Binder name not found!'), binder);
            return this.elements;
        }
        this.elements[name] = binder;
        return this.elements;
    }
}
exports.BindersService = BindersService;
