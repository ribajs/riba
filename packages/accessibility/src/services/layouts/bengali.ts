import { KeyboardLayout } from "../../types/index.js";

/**
 * Layout: Bengali
 * Source: adnan360 (https://github.com/adnan360)
 * Source simple-keyboard https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts
 */
export const bengali = {
  layout: {
    default: [
      "\u200C \u09e7 \u09e8 \u09e9 \u09ea \u09eb \u09ec \u09ed \u09ee \u09ef \u09e6 - = {bksp}".split(
        " ",
      ),
      "{tab} \u09b8 \u09b9 \u09c7 \u09be \u09bf \u09c1 \u09cb \u0995 \u0997 \u0999 \u09af \u0982 \u09cd".split(
        " ",
      ),
      "{capl} \u0985 \u0987 \u0989 \u099f \u09a1 \u09a8 \u09a4 \u09a6 \u09aa ; ' {enter}".split(
        " ",
      ),
      "{sftl} \u09ac \u09ae \u099a \u099c \u09b0 \u09b2 \u09b6 , . / {sftr}".split(
        " ",
      ),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "\u200d ! \u09cd\u09af \u09cd\u09b0 \u09f3 \u0025 \u0964 \u09b0\u09cd \u00d7 ( ) \u0981 + {bksp}".split(
        " ",
      ),
      "{tab} \u0993 \u0994 \u09c8 \u09c3 \u09c0 \u09c2 \u09cc \u0996 \u0998 \u098b \u09df \u09ce \u0983".split(
        " ",
      ),
      '{capl} \u0986 \u0988 \u098a \u09a0 \u09a2 \u09a3 \u09a5 \u09a7 \u09ab : " {enter}'.split(
        " ",
      ),
      "{sftl} \u09ad \u099e \u099b \u099d \u09dc \u09dd \u09b7 \u098f \u0990 ? {sftr}".split(
        " ",
      ),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
