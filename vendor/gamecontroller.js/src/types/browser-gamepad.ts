/**
 * Browser-specific gamepad extensions
 * These types represent non-standard properties added by different browsers
 */

/**
 * Extended Gamepad interface with haptic actuator variants
 */
export interface GamepadWithHapticActuators extends Gamepad {
	/**
	 * Non-standard hapticActuators property (newer standard, single actuator)
	 * Used in some browsers that implement the newer Gamepad Extensions spec
	 */
	hapticActuators?: GamepadHapticActuator;
}

export interface GamepadWithHapticActuatorsArray extends Gamepad {
	/**
	 * Non-standard hapticActuators property (array of actuators)
	 * Used in some browsers that support multiple haptic actuators
	 */
	hapticActuators?: GamepadHapticActuator[];
}

export interface GamepadWithVibrationActuator extends Gamepad {
	/**
	 * Old Chrome vibration actuator (deprecated)
	 * Used in older Chrome versions before the standard was finalized
	 */
	vibrationActuator: GamepadHapticActuator;
}

/**
 * Extended GamepadHapticActuator with different API variants
 * Note: We use intersection types to allow for API variations across browsers
 * The return type is unknown as different browsers return different values (Promise, string, etc.)
 */
export type GamepadHapticActuatorWithPulse = GamepadHapticActuator & {
	pulse(value: number, duration: number): unknown;
};

export type GamepadHapticActuatorWithPlayEffect = GamepadHapticActuator & {
	playEffect(
		effect: string,
		options: {
			duration: number;
			strongMagnitude: number;
			weakMagnitude: number;
		},
	): unknown;
};

/**
 * Extended Navigator with webkit prefixed gamepad methods
 */
export interface NavigatorWithWebkitGamepads extends Navigator {
	webkitGetGamepads?(): (Gamepad | null)[];
}

/**
 * Custom GamepadEvent with detail property
 * Some browsers dispatch custom events with gamepad in the detail property
 */
export interface CustomGamepadEvent extends Event {
	detail: {
		gamepad: Gamepad;
	};
}

/**
 * Extended Window interface for webkit requestAnimationFrame
 */
export interface WindowWithWebkitRAF extends Window {
	webkitRequestAnimationFrame?: typeof Window.prototype.requestAnimationFrame;
}

/**
 * Type guard to check if gamepad has hapticActuators (single)
 */
export function hasHapticActuators(
	gamepad: Gamepad,
): gamepad is GamepadWithHapticActuators {
	return "hapticActuators" in gamepad;
}

/**
 * Type guard to check if gamepad has hapticActuators array
 */
export function hasHapticActuatorsArray(
	gamepad: Gamepad,
): gamepad is GamepadWithHapticActuatorsArray {
	return "hapticActuators" in gamepad && Array.isArray(gamepad.hapticActuators);
}

/**
 * Type guard to check if gamepad has vibrationActuator
 */
export function hasVibrationActuator(
	gamepad: Gamepad,
): gamepad is GamepadWithVibrationActuator {
	return "vibrationActuator" in gamepad;
}

/**
 * Type guard to check if haptic actuator has pulse method
 */
export function hasPulseMethod(
	actuator: GamepadHapticActuator,
): actuator is GamepadHapticActuatorWithPulse {
	return "pulse" in actuator && typeof actuator.pulse === "function";
}

/**
 * Type guard to check if haptic actuator has playEffect method
 */
export function hasPlayEffectMethod(
	actuator: GamepadHapticActuator,
): actuator is GamepadHapticActuatorWithPlayEffect {
	return "playEffect" in actuator && typeof actuator.playEffect === "function";
}

/**
 * Type guard to check if event is a custom gamepad event
 */
export function isCustomGamepadEvent(
	event: Event,
): event is CustomGamepadEvent {
	return "detail" in event && typeof event.detail === "object";
}
