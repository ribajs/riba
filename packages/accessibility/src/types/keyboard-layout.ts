import { KeyboardLayoutKey } from "./index.js";

export interface KeyboardLayout {
  default: KeyboardLayoutKey[][];
  shift: KeyboardLayoutKey[][];
}
