import { KeyboardLayout } from "../../../types/index.js";

/**
 * Layout: Georgian
 * Source: e404r (https://github.com/e404r)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const georgian = {
  layout: {
    default: [
      "„ 1 2 3 4 5 6 7 8 9 0 - = {bksp}".split(" "),
      "{tab} ქ წ ე რ ტ ყ უ ი ო პ [ ] \\".split(" "),
      "{capl} ა ს დ ფ გ ჰ ჯ კ ლ ; ' {enter}".split(" "),
      "{sftl} ზ ხ ც ვ ბ ნ მ , . / {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "“ ! @ # $ % ^ & * ( ) _ + {bksp}".split(" "),
      "{tab} ქ ჭ ე ღ თ ყ უ ი ო პ { } | ~".split(" "),
      '{capl} ა შ დ ფ გ ჰ ჟ კ ₾ : " {enter}',
      "{sftl} ძ ხ ჩ ვ ბ ნ მ < > ? {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
