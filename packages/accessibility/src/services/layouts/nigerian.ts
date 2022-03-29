import { KeyboardLayout } from "../../types/index.js";

/**
 * Layout: Nigerian
 * Source: Benson Muite (https://github.com/bkmgit)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const nigerian = {
  layout: {
    default: [
      "ˊ 1 2 3 4 5 6 7 8 9 0 ɗ ƙ {bksp}".split(" "),
      "{tab} q w e r t y u i o p ụ ị".split(" "),
      "{capl} a s d f g h j k l ọ ẹ ǝ {enter}".split(" "),
      "{sftl} z y x c v b n m , . ṣ {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      'ˆ ! " / _ ₦ % = - | ( ) Ɗ Ƙ {bksp}'.split(" "),
      "{tab} Q W E R T Y U I O P Ụ Ị".split(" "),
      "{capl} A S D F G H J K L Ọ Ẹ Ǝ {enter}".split(" "),
      "{sftl} Z Ɓ C V B N M ; : Ṣ {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
