import { KeyboardLayout } from "../../../types/index.js";

/**
 * Layout: Turkish
 * Source: wpressdev (https://github.com/wpressdev)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const turkish = {
  layout: {
    default: [
      '" 1 2 3 4 5 6 7 8 9 0 * - # {bksp}'.split(" "),
      "{tab} q w e r t y u ı o p ğ ü [ ]".split(" "),
      "{capl} a s d f g h j k l ş i , {enter}".split(" "),
      "{sftl} < z x c v b n m ö ç . | $ € {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "é ! ' ^ + % & / ( ) = ? _ ~ {bksp}".split(" "),
      "{tab} Q W E R T Y U I O P Ğ Ü { }".split(" "),
      "{capl} A S D F G H J K L Ş İ ; {enter}".split(" "),
      "{sftl} > Z X C V B N M Ö Ç : \\ ` ´ {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
