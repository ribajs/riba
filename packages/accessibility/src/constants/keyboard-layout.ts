import { KeyboardLayoutKey } from "../types/index.js";

export const KEYBOARD_LAYOUT_DEFAULT: KeyboardLayoutKey[][] = [
  "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}".split(" ") as KeyboardLayoutKey[],
  "{tab} q w e r t y u i o p [ ] \\".split(" ") as KeyboardLayoutKey[],
  "{capl} a s d f g h j k l ; ' {enter}".split(" ") as KeyboardLayoutKey[],
  "{sftl} z x c v b n m , . / {sftr}".split(" ") as KeyboardLayoutKey[],
  ".com @ {space}".split(" ") as KeyboardLayoutKey[],
];

export const KEYBOARD_LAYOUT_SHIFT = [
  "~ ! @ # $ % ^ & * ( ) _ + {bksp}".split(" ") as KeyboardLayoutKey[],
  "{tab} Q W E R T Y U I O P { } |".split(" ") as KeyboardLayoutKey[],
  '{capl} A S D F G H J K L : " {enter}'.split(" ") as KeyboardLayoutKey[],
  "{sftl} Z X C V B N M < > ? {sftr}".split(" ") as KeyboardLayoutKey[],
  ".com @ {space}".split(" ") as KeyboardLayoutKey[],
];

/**
 * Default button display labels
 * TODO: Use i18n module for this
 */
export const KEYBOARD_LAYOUT_LABELS_DEFAULT: {
  [layoutkey in KeyboardLayoutKey]?: string;
} = {
  "{bksp}": "backspace",
  "{enter}": "enter",
  "{sftl}": "shift",
  "{sftr}": "shift",
  "{altl}": "alt",
  "{altr}": "alt",
  "{tab}": "tab",
  "{capl}": "caps",
  "{controlleft}": "cmd", // TODO:
  "{controlright}": "cmd", // TODO:
  // TODO: "{accept}": "Submit",
  "{space}": " ",
  "{esc}": "esc",
  "{f1}": "f1",
  "{f2}": "f2",
  "{f3}": "f3",
  "{f4}": "f4",
  "{f5}": "f5",
  "{f6}": "f6",
  "{f7}": "f7",
  "{f8}": "f8",
  "{f9}": "f9",
  "{f10}": "f10",
  "{f11}": "f11",
  "{f12}": "f12",
  "{numpaddivide}": "/",
  "{numlock}": "lock",
  "{arrowup}": "↑",
  "{arrowleft}": "←",
  "{arrowdown}": "↓",
  "{arrowright}": "→",
  "{prtscr}": "print",
  "{scrolllock}": "scroll",
  "{pause}": "pause",
  "{insert}": "ins",
  "{home}": "home",
  "{pageup}": "up",
  "{delete}": "del",
  "{end}": "end",
  "{pagedown}": "down",
  "{numpadmultiply}": "*",
  "{numpadsubtract}": "-",
  "{numpadadd}": "+",
  "{numpadenter}": "enter",
  "{numpaddecimal}": ".",
  "{numpad0}": "0",
  "{numpad1}": "1",
  "{numpad2}": "2",
  "{numpad3}": "3",
  "{numpad4}": "4",
  "{numpad5}": "5",
  "{numpad6}": "6",
  "{numpad7}": "7",
  "{numpad8}": "8",
  "{numpad9}": "9",
};
