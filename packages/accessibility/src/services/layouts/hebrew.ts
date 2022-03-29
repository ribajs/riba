import { KeyboardLayout } from "../../types/index.js";

/**
 * Layout: Hebrew
 * Source: vleon1 (https://github.com/vleon1)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const hebrew = {
  layout: {
    default: [
      " 1 2 3 4 5 6 7 8 9 0 - = {bksp}".split(" "),
      "{tab} / ' \u05e7 \u05e8 \u05d0 \u05d8 \u05d5 \u05df \u05dd \u05e4 ] [ :".split(
        " "
      ),
      "{capl} \u05e9 \u05d3 \u05d2 \u05db \u05e2 \u05d9 \u05d7 \u05dc \u05da \u05e3 , {enter}".split(
        " "
      ),
      "{sftl} \u05d6 \u05e1 \u05d1 \u05d4 \u05e0 \u05de \u05e6 \u05ea \u05e5 . {sftr}".split(
        " "
      ),
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
