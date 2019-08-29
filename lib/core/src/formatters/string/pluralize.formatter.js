"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../services/utils");
exports.pluralize = {
    name: 'pluralize',
    read(input, singular, plural) {
        if (plural === null) {
            plural = singular + 's';
        }
        if (utils_1.Utils.isArray(input)) {
            input = input.length;
        }
        if (input === 1) {
            return singular;
        }
        else {
            return plural;
        }
    },
};
