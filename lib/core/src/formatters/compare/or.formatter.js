"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * a || b
 */
exports.or = {
    name: 'or',
    read(a, b) {
        return a || b;
    },
};
