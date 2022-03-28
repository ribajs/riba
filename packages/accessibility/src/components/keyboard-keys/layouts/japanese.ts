import { KeyboardLayout } from "../../../types/index.js";

/**
 * Layout: Japanese
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const japanese = {
  layout: {
    default: [
      "1 2 3 4 5 6 7 8 9 0 - ^ ¥ {bksp}".split(" "),
      "{tab} た て い す か ん な に ら せ ゛ ゜ む".split(" "),
      "{capl} ち と し は き く ま の り れ け {enter}".split(" "),
      "{sftl} つ さ そ ひ こ み も ね る め {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "! \" # $ % & ' ( ) \u0301 = ~ | {bksp}".split(" "),
      "{tab} た て ぃ す か ん な に ら せ 「 」 む".split(" "),
      "{capl} ち と し は き く ま の り れ け {enter}".split(" "),
      "{sftl} っ さ そ ひ こ み も 、 。 ・ {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
