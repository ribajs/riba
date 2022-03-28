import { KeyboardLayout } from "../../../types/index.js";

/**
 * Layout: Greek
 * Source: maciej-sielski (https://github.com/maciej-sielski)
 * Source simple-keyboard (https://github.com/simple-keyboard/simple-keyboard-layouts/tree/master/src/lib/layouts)
 */
export const greek = {
  layout: {
    default: [
      "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}".split(" "),
      "{tab} ; ς ε ρ τ υ θ ι ο π [ ] \\".split(" "),
      "{capl} α σ δ φ γ η ξ κ λ ΄ ' {enter}".split(" "),
      "{sftl} < ζ χ ψ ω β ν μ , . / {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
    shift: [
      "~ ! @ # $ % ^ & * ( ) _ + {bksp}".split(" "),
      "{tab} : ΅ Ε Ρ Τ Υ Θ Ι Ο Π { } |".split(" "),
      '{capl} Α Σ Δ Φ Γ Η Ξ Κ Λ ¨ " {enter}',
      "{sftl} > Ζ Χ Ψ Ω Β Ν Μ < > ? {sftr}".split(" "),
      ".com @ {space}".split(" "),
    ],
  } as KeyboardLayout,
};
