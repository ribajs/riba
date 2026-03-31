import type { GamepadState } from "./gamepad";

export interface GCGamepads {
	[id: string]: GamepadState;
}
