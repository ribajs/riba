import { KeyboardLayout } from "../../types/index.js";

/**
 * Layout: Hindi
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const hindi = {
  layout: {
    default: [
      "` \u090D \u0945 \u094D\u0930 \u0930\u094D \u091C\u094D\u091E \u0924\u094D\u0930 \u0915\u094D\u0937 \u0936\u094D\u0930 \u096F \u0966 - \u0943 {bksp}".split(
        " "
      ),
      "{tab} \u094C \u0948 \u093E \u0940 \u0942 \u092C \u0939 \u0917 \u0926 \u091C \u0921 \u093C \u0949 \\".split(
        " "
      ),
      "{capl} \u094B \u0947 \u094D \u093F \u0941 \u092A \u0930 \u0915 \u0924 \u091A \u091F {enter}".split(
        " "
      ),
      "{sftl} \u0902 \u092E \u0928 \u0935 \u0932 \u0938 , . \u092F {sftr}".split(
        " "
      ),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "~ \u0967 \u0968 \u0969 \u096A \u096B \u096C \u096D \u096E \u096F \u0966 \u0903 \u090B {bksp}".split(
        " "
      ),
      "{tab} \u0914 \u0910 \u0906 \u0908 \u090A \u092D \u0919 \u0918 \u0927 \u091D \u0922 \u091E \u0911".split(
        " "
      ),
      "{capl} \u0913 \u090F \u0905 \u0907 \u0909 \u092B \u0931 \u0916 \u0925 \u091B \u0920 {enter}".split(
        " "
      ),
      '{sftl} "" \u0901 \u0923 \u0928 \u0935 \u0933 \u0936 \u0937 \u0964 \u095F {sftl}'.split(
        " "
      ),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
