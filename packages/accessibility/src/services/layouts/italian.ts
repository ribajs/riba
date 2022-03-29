import { KeyboardLayout } from "../../types/index.js";

/**
 * Layout: Italian
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const italian = {
  layout: {
    default: [
      "\\ 1 2 3 4 5 6 7 8 9 0 ' \u00EC {bksp}".split(" "),
      "{tab} q w e r t y u i o p \u00E8 +".split(" "),
      "{capl} a s d f g h j k l \u00F2 \u00E0 \u00F9 {enter}".split(" "),
      "{sftl} < z x c v b n m , . - {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      '| ! " \u00A3 $ % & / ( ) = ? ^ {bksp}'.split(" "),
      "{tab} Q W E R T Y U I O P \u00E9 *".split(" "),
      "{capl} A S D F G H J K L \u00E7 \u00B0 \u00A7 {enter}".split(" "),
      "{sftl} > Z X C V B N M ; : _ {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
