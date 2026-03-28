import { MESSAGES } from "./constants";
import { GAMEPAD_BUTTONS } from "./constants-buttons";
import { emptyEvents, error } from "./tools";
import type {
	GamepadState,
	GCDirection,
	GCType,
	NavigatorWithWebkitGamepads,
} from "./types";
import {
	hasHapticActuators,
	hasHapticActuatorsArray,
	hasPlayEffectMethod,
	hasPulseMethod,
	hasVibrationActuator,
} from "./types";

const gamepad = {
	init: (gpad: Gamepad) => {
		const gamepadPrototype: GamepadState = {
			id: gpad.index,
			controllerId: gpad.id,
			buttons: gpad.buttons.length,
			axes: Math.floor(gpad.axes.length / 2),
			axeValues: [],
			axeThreshold: [1.0],
			hapticActuator: null,
			vibrationMode: -1,
			vibration: false,
			mapping: gpad.mapping,
			buttonActions: {},
			axesActions: {},
			pressed: {},
			set: function (property: "axeThreshold", value: number[]) {
				const properties = ["axeThreshold"];
				if (properties.indexOf(property) >= 0) {
					// Ensure value is an array
					if (!Array.isArray(value)) {
						error(MESSAGES.INVALID_VALUE_NUMBER);
						return;
					}
					const [threshold] = value;
					if (
						property === "axeThreshold" &&
						(Number.isNaN(threshold) || threshold < 0.0 || threshold > 1.0)
					) {
						error(MESSAGES.INVALID_VALUE_NUMBER);
						return;
					}
					this[property] = [threshold];
				} else {
					error(MESSAGES.INVALID_PROPERTY);
				}
			},
			vibrate: function (value = 0.75, duration = 500) {
				if (this.hapticActuator) {
					switch (this.vibrationMode) {
						case 0:
							if (hasPulseMethod(this.hapticActuator)) {
								return this.hapticActuator.pulse(value, duration);
							}
							break;
						case 1:
							if (hasPlayEffectMethod(this.hapticActuator)) {
								return this.hapticActuator.playEffect("dual-rumble", {
									duration: duration,
									strongMagnitude: value,
									weakMagnitude: value,
								});
							}
							break;
					}
				}
				// Return undefined if no haptic actuator is available
				return undefined;
			},
			triggerDirectionalAction: function (
				id: GCDirection,
				axe: number,
				condition: boolean,
				x: number,
				index: number,
			) {
				if (condition && x % 2 === index) {
					if (!this.pressed[`${id}${axe}`]) {
						this.pressed[`${id}${axe}`] = true;
						this.axesActions[axe][id].before();
					}
					this.axesActions[axe][id].action();
				} else if (this.pressed[`${id}${axe}`] && x % 2 === index) {
					delete this.pressed[`${id}${axe}`];
					this.axesActions[axe][id].after();
				}
			},
			checkStatus: function () {
				let gp: Gamepad | null = null;
				const gps: ReturnType<Navigator["getGamepads"]> = navigator.getGamepads
					? navigator.getGamepads()
					: (navigator as NavigatorWithWebkitGamepads).webkitGetGamepads
						? ((
								navigator as NavigatorWithWebkitGamepads
							).webkitGetGamepads?.() ?? [])
						: [];

				if (gps.length) {
					gp = gps[this.id];
					if (!gp) {
						return;
					}
					if (gp.buttons) {
						for (let x = 0; x < this.buttons; x++) {
							if (gp.buttons[x].pressed === true) {
								if (!this.pressed[`button${x}`]) {
									this.pressed[`button${x}`] = true;
									this.buttonActions[x].before();
								}
								this.buttonActions[x].action();
							} else if (this.pressed[`button${x}`]) {
								delete this.pressed[`button${x}`];
								this.buttonActions[x].after();
							}
						}
					}
					if (gp.axes) {
						const modifier = gp.axes.length % 2; // Firefox hack: detects one additional axe
						for (let x = 0; x < this.axes * 2; x++) {
							const val = Number(gp.axes[x + modifier].toFixed(4));
							const axe = Math.floor(x / 2);
							this.axeValues[axe][x % 2] = val;

							this.triggerDirectionalAction(
								"right",
								axe,
								val >= this.axeThreshold[0],
								x,
								0,
							);
							this.triggerDirectionalAction(
								"left",
								axe,
								val <= -this.axeThreshold[0],
								x,
								0,
							);
							this.triggerDirectionalAction(
								"down",
								axe,
								val >= this.axeThreshold[0],
								x,
								1,
							);
							this.triggerDirectionalAction(
								"up",
								axe,
								val <= -this.axeThreshold[0],
								x,
								1,
							);
						}
					}
				}
			},
			associateEvent: function (
				eventName: string,
				callback: () => void,
				type: GCType,
			) {
				if (eventName.match(/^button\d+$/)) {
					const buttonId = parseInt(
						eventName.match(/^button(\d+)$/)?.[1] || "0",
						10,
					);
					if (buttonId >= 0 && buttonId < this.buttons) {
						this.buttonActions[buttonId][type] = callback;
					} else {
						error(MESSAGES.INVALID_BUTTON(eventName));
					}
				} else if (eventName === "start") {
					this.buttonActions[GAMEPAD_BUTTONS.BUTTON_CONTROL_RIGHT][type] =
						callback;
				} else if (eventName === "select") {
					this.buttonActions[GAMEPAD_BUTTONS.BUTTON_CONTROL_LEFT][type] =
						callback;
				} else if (eventName === "r1") {
					this.buttonActions[GAMEPAD_BUTTONS.BUMPER_RIGHT][type] = callback;
				} else if (eventName === "r2") {
					this.buttonActions[GAMEPAD_BUTTONS.TRIGGER_RIGHT][type] = callback;
				} else if (eventName === "l1") {
					this.buttonActions[GAMEPAD_BUTTONS.BUMPER_LEFT][type] = callback;
				} else if (eventName === "l2") {
					this.buttonActions[GAMEPAD_BUTTONS.TRIGGER_LEFT][type] = callback;
				} else if (eventName === "power") {
					if (this.buttons >= 17) {
						this.buttonActions[GAMEPAD_BUTTONS.BUTTON_CONTROL_MIDDLE][type] =
							callback;
					} else {
						error(MESSAGES.INVALID_BUTTON(eventName));
					}
				} else if (eventName.match(/^(up|down|left|right)(\d+)$/)) {
					const matches = eventName.match(/^(up|down|left|right)(\d+)$/);
					if (!matches) {
						error(MESSAGES.UNKNOWN_EVENT);
						return this;
					}
					const direction = matches[1] as GCDirection;
					const axe = parseInt(matches[2], 10);
					if (axe >= 0 && axe < this.axes) {
						this.axesActions[axe][direction][type] = callback;
					} else {
						error(MESSAGES.INVALID_BUTTON(eventName));
					}
				} else if (eventName.match(/^(up|down|left|right)$/)) {
					const direction = eventName.match(/^(up|down|left|right)$/)?.[1] as
						| GCDirection
						| undefined;
					if (!direction) {
						error(MESSAGES.UNKNOWN_EVENT);
						return this;
					}
					this.axesActions[0][direction][type] = callback;
				}
				return this;
			},
			on: function (eventName: string, callback: () => void) {
				return this.associateEvent(eventName, callback, "action");
			},
			off: function (eventName: string) {
				return this.associateEvent(eventName, () => {}, "action");
			},
			after: function (eventName: string, callback: () => void) {
				return this.associateEvent(eventName, callback, "after");
			},
			before: function (eventName: string, callback: () => void) {
				return this.associateEvent(eventName, callback, "before");
			},
		};

		for (let x = 0; x < gamepadPrototype.buttons; x++) {
			gamepadPrototype.buttonActions[x] = emptyEvents();
		}
		for (let x = 0; x < gamepadPrototype.axes; x++) {
			gamepadPrototype.axesActions[x] = {
				down: emptyEvents(),
				left: emptyEvents(),
				right: emptyEvents(),
				up: emptyEvents(),
			};
			gamepadPrototype.axeValues[x] = [0, 0];
		}

		// check if vibration actuator exists
		// Check array first, as it's more specific than single actuator
		if (hasHapticActuatorsArray(gpad)) {
			// newer standard - array of hapticActuators
			const actuators = gpad.hapticActuators;
			if (actuators?.[0] && hasPulseMethod(actuators[0])) {
				gamepadPrototype.hapticActuator = actuators[0];
				gamepadPrototype.vibrationMode = 0;
				gamepadPrototype.vibration = true;
			}
		} else if (hasHapticActuators(gpad)) {
			// newer standard - single hapticActuators property
			const actuator = gpad.hapticActuators;
			if (actuator && hasPulseMethod(actuator)) {
				gamepadPrototype.hapticActuator = actuator;
				gamepadPrototype.vibrationMode = 0;
				gamepadPrototype.vibration = true;
			}
		} else if (hasVibrationActuator(gpad)) {
			// old chrome vibrationActuator (deprecated)
			const actuator = gpad.vibrationActuator;
			if (actuator && hasPlayEffectMethod(actuator)) {
				gamepadPrototype.hapticActuator = actuator;
				gamepadPrototype.vibrationMode = 1;
				gamepadPrototype.vibration = true;
			}
		}

		return gamepadPrototype;
	},
};

export default gamepad;
