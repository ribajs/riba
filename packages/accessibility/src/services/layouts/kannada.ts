import { KeyboardLayout } from "../../types/index.js";

/**
 * Layout: Kannada
 * Source: yogishp (https://github.com/yogishp)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const kannada = {
  layout: {
    default: [
      "\u0cca 1 2 3 4 5 6 7 8 9 0 - \u0cc3 {bksp}".split(" "),
      "{tab} \u0ccc \u0cc8 \u0cbe \u0cc0 \u0cc2 \u0cac \u0cb9 \u0c97 \u0ca6 \u0c9c \u0ca1".split(
        " ",
      ),
      "\u0ccb \u0cc7 \u0ccd \u0cbf \u0cc1 \u0caa \u0cb0 \u0c95 \u0ca4 \u0c9a \u0c9f {enter}".split(
        " ",
      ),
      "{sftl} \u0cc6 \u0c82 \u0cae \u0ca8 \u0cb5 \u0cb2 \u0cb8 , . / {sftr}".split(
        " ",
      ),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "\u0c92 \u0ccd\u0cb0 \u0cb0\u0ccd \u0c9c\u0ccd\u0c9e \u0ca4\u0ccd\u0cb0 \u0c95\u0ccd\u0cb7 \u0cb6\u0ccd\u0cb0 ( ) \u0c83 \u0c8b {bksp}".split(
        " ",
      ),
      "{tab} \u0c94 \u0c90 \u0c86 \u0c88 \u0c8a \u0cad \u0c99 \u0c98 \u0ca7 \u0c9d \u0ca2 \u0c9e".split(
        " ",
      ),
      "\u0c93 \u0c8f \u0c85 \u0c87 \u0c89 \u0cab \u0cb1 \u0c96 \u0ca5 \u0c9b \u0ca0 {enter}".split(
        " ",
      ),
      "{sftl} \u0c8e \u0ca3 \u0cb3 \u0cb6 \u0cb7 | / {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
