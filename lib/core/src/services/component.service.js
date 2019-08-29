"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_element_service_1 = require("./module-element.service");
class ComponentService extends module_element_service_1.ModuleElementService {
    /**
     *
     * @param components
     */
    constructor(components) {
        super(components);
        this.type = 'components';
    }
    /**
     * Regist a component with his name
     * @param component
     * @param name
     */
    regist(component, fallbackName, forceFallback = false) {
        const name = forceFallback ? fallbackName || component.tagName : component.tagName || fallbackName;
        if (!name) {
            console.warn(new Error('Component name not found!'), component);
            return this.elements;
        }
        this.elements[name] = component;
        return this.elements;
    }
}
exports.ComponentService = ComponentService;
