"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const module_element_service_1 = require("./module-element.service");
class FormatterService extends module_element_service_1.ModuleElementService {
    /**
     *
     */
    constructor(formatters) {
        super(formatters);
        this.type = 'formatter';
    }
    /**
     * Regist a formatter with his name
     * @param formatter
     * @param name
     */
    regist(formatter, fallbackName, forceFallback = false) {
        const name = forceFallback ? fallbackName || formatter.name : formatter.name || fallbackName;
        if (!name) {
            throw new Error('Formatter name not found!');
        }
        this.elements[name] = formatter;
        return this.elements;
    }
}
exports.FormatterService = FormatterService;
