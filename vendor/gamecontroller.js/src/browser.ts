// This file is the entry point for browsers, this file set's the global window.gameControl object
export * from "./types";

import { MESSAGES } from "./constants";
import gameControl from "./gamecontrol";
import { error, isGamepadSupported } from "./tools";

declare global {
	interface Window {
		gameControl: typeof gameControl;
	}
}

if (isGamepadSupported()) {
	window.gameControl = gameControl;
} else {
	error(MESSAGES.NO_SUPPORT);
}

export { GAMEPAD_AXES, GAMEPAD_BUTTONS } from "./constants-buttons";
export { gameControl, isGamepadSupported, MESSAGES };
export default gameControl;
