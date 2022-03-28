import { KeyboardLayout } from "../../../types/index.js";

/**
 * Layout: Sindhi
 * Source: Salman Sattar (https://github.com/salman65)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const sindhi = {
  layout: {
    default: [
      "` ١ ٢ ٣ ٤ ٥ ٦ ٧ ٨ ٩ ٠ - = {bksp}".split(" "),
      "{tab} ق و ع ر ت ڀ ء ي ہ پ [ ]".split(" "),
      "{capl} ا س د ف گ ھ ج ک ل ؛ ، {enter}".split(" "),
      "{sftl} ز ش چ ط ب ن م ڇ , . / {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "~ ! @ # $ ٪ ^ & * ( ) _ + {bksp}".split(" "),
      "{tab} ﹰ ڌ ڪ ڙ ٽ ﹺ ﻻ ﺋ ڦ | { }".split(" "),
      "{capl} ٻ ص ڊ ؍ غ ح ض خ ۔ ܃ ״ {enter}".split(" "),
      "{sftl} ذ ٿ ث ظ ٺ ٫ ـ < > ؟ {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
