"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strip_formatter_1 = require("./strip.formatter");
const downcase_formatter_1 = require("./downcase.formatter");
/**
 * Formats a string into a handle.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#handle-handleize
 */
exports.handleize = {
    name: 'handleize',
    read(str) {
        str = strip_formatter_1.strip.read(str);
        str = str.replace(/[^\w\s]/gi, ''); // http://stackoverflow.com/a/4374890
        str = downcase_formatter_1.downcase.read(str);
        return str.replace(/ /g, '-');
    },
};
