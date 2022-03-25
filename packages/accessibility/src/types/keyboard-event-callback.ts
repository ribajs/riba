import type { KeyboardKeyData } from "../types/index.js";
import type { KeyboardService } from "../services/index.js";

export type KeyboardEventCallback = (
  keyData: KeyboardKeyData,
  keyboard: KeyboardService,
  event: KeyboardEvent
) => any;
