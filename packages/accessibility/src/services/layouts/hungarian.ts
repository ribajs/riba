import { KeyboardLayout } from "../../types/index.js";

/**
 * Layout: Hungarian
 * Source: Farquaad (https://github.com/Farquaad)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const hungarian = {
  layout: {
    default: [
      "0 1 2 3 4 5 6 7 8 9 ö ü ó {bksp}".split(" "),
      "{tab} q w e r t z u i o p ő ú".split(" "),
      "{capl} a s d f g h j k l é á ű {enter}".split(" "),
      "{sftl} í y x c v b n m , . - {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "§ ' \" + ! % / = ( ) Ö Ü Ó {bksp}".split(" "),
      "{tab} Q W E R T Z U I O P Ő Ú".split(" "),
      "{capl} A S D F G H J K L É Á Ű {enter}".split(" "),
      "{sftl} Í Y X C V B N M ? : _ {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
