import { KeyboardLayout } from "../../types/index.js";

/**
 * Layout: Polish
 * Source: maciej-sielski (https://github.com/maciej-sielski)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const polish = {
  layout: {
    default: [
      "\u02DB 1 2 3 4 5 6 7 8 9 0 + ' {bksp}".split(" "),
      "{tab} q w e r t z u i o p \u017C \u015B".split(" "),
      "{capl} a s d f g h j k l \u0142 \u0105 \u00F3 {enter}".split(" "),
      "{sftl} < y x c v b n m , . - {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      '\u00B7 ! " # \u00A4 % & / ( ) = ? * {bksp}'.split(" "),
      "{tab} Q W E R T Z U I O P \u0144 \u0107".split(" "),
      "{capl} A S D F G H J K L \u0141 \u0119 \u017A {enter}".split(" "),
      "{sftl} > Y X C V B N M ; : _ {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
