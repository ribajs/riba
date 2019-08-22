import setString from 'chalk';
import { Color } from '../../interfaces';

export { setString };

/**
 * Gives all characters of a string a desired color
 * @param str The string which should be manipulated / colored
 * @param chars The characters to be colored
 * @param color The color to use
 * @return The manipulated / colored string
 */
export const setChars = function (str: string, chars: string[], color: Color) {
  for (const char of chars) {
    str = str.replace(new RegExp(char, 'g'), setString[color](char));
  }
  return str;
}
