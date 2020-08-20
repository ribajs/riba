"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setChars = exports.setString = void 0;
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
        str = str.replace(new RegExp(char, "g"), chalk_1.default[color](char));
    }
    return str;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2xpYi91aS9jb2xvcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsa0RBQThCO0FBR3JCLG9CQUhGLGVBQVMsQ0FHRTtBQUVsQjs7Ozs7O0dBTUc7QUFDVSxRQUFBLFFBQVEsR0FBRyxVQUFVLEdBQVcsRUFBRSxLQUFlLEVBQUUsS0FBWTtJQUMxRSxLQUFLLE1BQU0sSUFBSSxJQUFJLEtBQUssRUFBRTtRQUN4QixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLEVBQUUsZUFBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7S0FDbEU7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMsQ0FBQyJ9