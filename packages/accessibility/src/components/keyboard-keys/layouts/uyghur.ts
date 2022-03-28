import { KeyboardLayout } from "../../../types/index.js";

/**
 * Layout: Uyghur
 * Source: Ailiniyazi Maimaiti (https://github.com/fkcailiniyazi)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const uyghur = {
  layout: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}".split(" "),
      "{tab} چ ۋ ې ر ت ي ۇ ڭ و پ ] [ /".split(" "),
      "{capl} ھ س د ا ە ى ق ك ل ؛ : {enter}".split(" "),
      "{sftl} ز ش غ ۈ ب ن م ، . \u0626 {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "~ ! @ # $ % ^ & * ) ( - + {bksp}".split(" "),
      "{tab} چ ۋ ې ر ت ي ۇ ڭ و » « \\".split(" "),
      "{capl} ھ س ژ ف گ خ ج ۆ ل ؛ | {enter}".split(" "),
      "{sftl} ز ش غ ۈ ب ن م ‹ › ؟ {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
