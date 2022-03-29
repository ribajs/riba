import { KeyboardLayout } from "../../types/index.js";

/**
 * Layout: Urdu
 * Source: Salman Sattar (https://github.com/salman65)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const urdu = {
  layout: {
    default: [
      "` \u0661 \u0662 \u0663 \u0664 \u0665 \u0666 \u0667 \u0668 \u0669 \u0660 - = {bksp}".split(
        " "
      ),
      "{tab} \u0642 \u0648 \u0639 \u0631 \u062A \u06D2 \u0621 \u0649 \u06C1 \u067E [ ]".split(
        " "
      ),
      "{capl} \u0627 \u0633 \u062F \u0641 \u06AF \u06BE \u062C \u06A9 \u0644 \u061B \u060C {enter}".split(
        " "
      ),
      "{sftl} \u0632 \u0634 \u0686 \u0637 \u0628 \u0646 \u0645 \u06E4 , . / {sftr}".split(
        " "
      ),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "~ ! @ # $ \u066A ^ & * ( ) _ + {bksp}".split(" "),
      "{tab} \uFE70 \uFE77 \uFE79 \u0691 \u0679 \uFE7A \uFEFB \uFE8B \u0629 | { }".split(
        " "
      ),
      "{capl} \u0622 \u0635 \u0688 \u060D \u063A \u062D \u0636 \u062E \u06D4 \u0703 \u05f4 {enter}".split(
        " "
      ),
      "{sftl} \u0630 \u0698 \u062B \u0638 \u06BA \u066b \u0640 < > \u061F {sftr}".split(
        " "
      ),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
