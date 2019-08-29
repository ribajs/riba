"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Parse a string to boolean
 */
exports.booleanFormatter = {
    name: 'boolean',
    read(value) {
        return value === 'true' || value === true;
    },
};
