import { KeyboardLayout } from "../../../types/index.js";

/**
 * Layout: French
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const french = {
  layout: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 \u00B0 + {bksp}".split(" "),
      "{tab} a z e r t y u i o p ^ $".split(" "),
      "{capl} q s d f g h j k l m \u00F9 * {enter}".split(" "),
      "{sftl} < w x c v b n , ; : ! {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "\u00B2 & \u00E9 \" ' ( - \u00E8 _ \u00E7 \u00E0 ) = {bksp}".split(" "),
      "{tab} A Z E R T Y U I O P \u00A8 \u00A3".split(" "),
      "{capl} Q S D F G H J K L M % \u00B5 {enter}".split(" "),
      "{sftl} > W X C V B N ? . / \u00A7 {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
