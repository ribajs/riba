import { KeyboardLayout } from "../../../types/index.js";

/**
 * Layout: Belarusian
 * Source: maxshuty (https://github.com/maxshuty)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const belarusian = {
  layout: {
    default: [
      "ё ` 1 2 3 4 5 6 7 8 9 0 - = {bksp}".split(" "),
      "{tab} й ц у к е н г ш ў з х [ ] \\".split(" "),
      "{capl} ф ы в а п р о л д ж э ; ' {enter}".split(" "),
      "{sftl} я ч с м і т ь б ю , . / {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "Ё ~ ! @ # $ % ^ & * ( ) _ + {bksp}".split(" "),
      "{tab} Й Ц У К Е Н Г Ш Ў З Х { } |".split(" "),
      '{capl} Ф Ы В А П Р О Л Д Ж Э : " {enter}',
      "{sftl} Я Ч С М І Т Ь Б Ю < > ? {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
