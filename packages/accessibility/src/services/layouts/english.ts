import { KeyboardLayout } from "../../types/index.js";

/**
 * Layout: English
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const english = {
  layout: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}".split(" "),
      "{tab} q w e r t y u i o p [ ] \\".split(" "),
      "{capl} a s d f g h j k l ; ' {enter}".split(" "),
      "{sftl} z x c v b n m , . / {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}".split(" "),
      "{tab} Q W E R T Y U I O P { } |".split(" "),
      '{capl} A S D F G H J K L : " {enter}'.split(" "),
      "{sftl} Z X C V B N M < > ? {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
