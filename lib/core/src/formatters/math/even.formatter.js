"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Prüft ob eine Zahl gerade ist oder nicht
 * Check if a number is even or not
 */
exports.even = {
    name: 'even',
    read(num) {
        return (num % 2) === 0;
    },
};
