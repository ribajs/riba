import { KeyboardLayout } from "../../types/index.js";

/**
 * Layout: Arabic
 * Source simple-keyboard https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts
 */
export const arabic = {
  layout: {
    default: [
      "\u0630 1 2 3 4 5 6 7 8 9 0 - = {bksp}".split(" "),
      "{tab} ض ص ث ق ف غ ع ه خ ح ج د \\".split(" "),
      "{capl} ش س ي ب ل ا ت ن م ك ط {enter}".split(" "),
      "{sftl} ئ ء ؤ ر لا ى ة و ز ظ {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "\u0651 ! @ # $ % ^ & * ) ( _ + {bksp}".split(" "),
      "{tab} \u064E \u064B \u064F \u064C \u0644\u0625 \u0625 \u2018 \u00F7 \u00D7 \u061B < > |".split(
        " ",
      ),
      '{capl} \u0650 \u064D ] [ \u0644\u0623 \u0623 \u0640 \u060C / : " {enter}'.split(
        " ",
      ),
      "{sftl} ~ \u0652 } { \u0644\u0622 \u0622 \u2019 , . \u061F {sftr}".split(
        " ",
      ),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
