import type { KeyboardKey } from "../types/index.js";
import type { KeyboardService } from "../services/index.js";

export type KeyboardEventCallback = (
  keyData: KeyboardKey,
  keyboard: KeyboardService,
  event: KeyboardEvent
) => any;
