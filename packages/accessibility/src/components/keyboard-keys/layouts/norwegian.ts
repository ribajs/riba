import { KeyboardLayout } from "../../../types/index.js";

/**
 * Layout: Nigerian
 * Source: Benson Muite (https://github.com/bkmgit)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const norwegian = {
  layout: {
    default: [
      "\u00A7 1 2 3 4 5 6 7 8 9 0 + \u00B4 {bksp}".split(" "),
      "{tab} q w e r t y u i o p \u00E5 ¨".split(" "),
      "{capl} a s d f g h j k l \u00F8 \u00E6 ' {enter}".split(" "),
      "{sftl} < z x c v b n m , . - {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      '\u00B0 ! " # $ % & / ( ) = ? ` {bksp}'.split(" "),
      "{tab} Q W E R T Y U I O P \u00C5 ^".split(" "),
      "{capl} A S D F G H J K L \u00D8 \u00C6 * {enter}".split(" "),
      "{sftl} > Z X C V B N M ; : _ {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
