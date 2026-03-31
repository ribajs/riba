/**
 * Standard gamepad button mappings according to W3C Gamepad API specification
 * @see https://www.w3.org/TR/gamepad/
 */
export const GAMEPAD_BUTTONS = {
	/** A button (bottom face button) - typically the primary action button */
	BUTTON_BOTTOM: 0,
	/** B button (right face button) - typically the secondary action button */
	BUTTON_RIGHT: 1,
	/** X button (left face button) - typically the tertiary action button */
	BUTTON_LEFT: 2,
	/** Y button (top face button) - typically the quaternary action button */
	BUTTON_TOP: 3,
	/** Left bumper button */
	BUMPER_LEFT: 4,
	/** Right bumper button */
	BUMPER_RIGHT: 5,
	/** Left trigger button */
	TRIGGER_LEFT: 6,
	/** Right trigger button */
	TRIGGER_RIGHT: 7,
	/** Left control button (select/back) */
	BUTTON_CONTROL_LEFT: 8,
	/** Right control button (start/menu) */
	BUTTON_CONTROL_RIGHT: 9,
	/** Left joystick click button */
	BUTTON_JOYSTICK_LEFT: 10,
	/** Right joystick click button */
	BUTTON_JOYSTICK_RIGHT: 11,
	/** D-pad up */
	D_PAD_UP: 12,
	/** D-pad down */
	D_PAD_BOTTOM: 13,
	/** D-pad left */
	D_PAD_LEFT: 14,
	/** D-pad right */
	D_PAD_RIGHT: 15,
	/** Middle control button (home/guide) */
	BUTTON_CONTROL_MIDDLE: 16,
} as const;

/**
 * Standard gamepad axis indices
 */
export const GAMEPAD_AXES = {
	/** Left joystick horizontal axis */
	JOYSTICK_LEFT_HORIZONTAL: 0,
	/** Left joystick vertical axis */
	JOYSTICK_LEFT_VERTICAL: 1,
	/** Right joystick horizontal axis */
	JOYSTICK_RIGHT_HORIZONTAL: 2,
	/** Right joystick vertical axis */
	JOYSTICK_RIGHT_VERTICAL: 3,
} as const;
