"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
exports.setString = chalk_1.default;
/**
 * Gives all characters of a string a desired color
 * @param str The string which should be manipulated / colored
 * @param chars The characters to be colored
 * @param color The color to use
 * @return The manipulated / colored string
 */
exports.setChars = function (str, chars, color) {
    for (const char of chars) {
        str = str.replace(new RegExp(char, 'g'), chalk_1.default[color](char));
    }
    return str;
};
