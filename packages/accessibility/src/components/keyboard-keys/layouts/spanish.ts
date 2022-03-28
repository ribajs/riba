import { KeyboardLayout } from "../../../types/index.js";

/**
 * Layout: Spanish
 * Source: Paco Alcantara (https://github.com/pacoalcantara)
 *         Based on: http://ascii-table.com/keyboard.php/171
 *         and http://ascii-table.com/keyboard.php/071-2
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const spanish = {
  layout: {
    default: [
      "| 1 2 3 4 5 6 7 8 9 0 ' ¿ {bksp}".split(" "),
      "{tab} q w e r t y u i o p \u0301 +".split(" "),
      "{capl} a s d f g h j k l ñ { } {enter}".split(" "),
      "{sftl} < z x c v b n m , . - {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      '° ! " # $ % & / ( ) = ? ¡ {bksp}'.split(" "),
      "{tab} Q W E R T Y U I O P \u0308 *".split(" "),
      "{capl} A S D F G H J K L Ñ [ ] {enter}".split(" "),
      "{sftl} > Z X C V B N M ; : _ {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
