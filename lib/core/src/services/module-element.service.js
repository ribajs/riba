"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vendors_1 = require("../vendors");
const utils_1 = require("./utils");
class ModuleElementService {
    /**
     *
     * @param elements;
     */
    constructor(elements) {
        this.debug = vendors_1.Debug('services:ModuleElementService');
        this.elements = elements;
    }
    /**
     * Regist a set / array of elements
     * @param elements
     */
    regists(elements) {
        if (!utils_1.Utils.isObject(elements)) {
            throw new Error('Elements to register must be an object of elements');
        }
        for (const key in elements) {
            if (elements.hasOwnProperty(key) && key !== '__esModule') {
                const element = elements[key];
                this.debug(`Regist ${this.type} with key "${key}"`, element);
                this.regist(element, key);
            }
        }
        return this.elements;
    }
}
exports.ModuleElementService = ModuleElementService;
