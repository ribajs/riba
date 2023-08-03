import { KeyboardLayout } from "../../types/index.js";

/**
 * Layout: Czech
 * Source: Dmitry Dalimov (https://github.com/slavabogov)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const czech = {
  layout: {
    default: [
      "; + \u011B \u0161 \u010D \u0159 \u017E \u00FD \u00E1 \u00ED \u00E9 \u00B4 {bksp}".split(
        " ",
      ),
      "{tab} q w e r t y u i o p \u00FA ) \u00A8".split(" "),
      "{capl} a s d f g h j k l \u016F \u00A7 {enter}".split(" "),
      "{sftl} \\ z x c v b n m , . - {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "\u00b0 1 2 3 4 5 6 7 8 9 0 % \u02c7 {bksp}".split(" "),
      "{tab} Q W E R T Y U I O P / ( '".split(" "),
      '{capl} A S D F G H J K L " ! {enter}'.split(" "),
      "{sftl} | Z X C V B N M ? : _ {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
