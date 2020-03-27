import setString from "chalk";
import { Color } from "../../interfaces/index";
export { setString };
/**
 * Gives all characters of a string a desired color
 * @param str The string which should be manipulated / colored
 * @param chars The characters to be colored
 * @param color The color to use
 * @return The manipulated / colored string
 */
export declare const setChars: (str: string, chars: string[], color: Color) => string;
