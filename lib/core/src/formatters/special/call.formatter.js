"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calls a function with arguments
 * @param fn The function you wish to call
 * @param args the parameters you wish to call the function with
 */
exports.call = {
    name: 'call',
    read(fn, ...args) {
        return fn.apply(this, args);
    },
};
