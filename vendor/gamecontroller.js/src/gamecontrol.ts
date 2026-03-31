import { MESSAGES } from "./constants";
import gamepad from "./gamepad";
import { error, isGamepadSupported, log } from "./tools";
import type {
	GameControl,
	GamepadState,
	GCCallback,
	GCConnectCallback,
	GCDisconnectCallback,
	GCGamepads,
	WindowWithWebkitRAF,
} from "./types";
import { isCustomGamepadEvent } from "./types";

declare global {
	interface Window {
		gamepads: {
			[id: number]: Gamepad;
		};
	}
}

const gameControl: GameControl = {
	gamepads: {} as GCGamepads,
	axeThreshold: [1.0], // this is an array so it can be expanded without breaking in the future
	isReady: isGamepadSupported(),
	onConnect: ((_gamepad: GamepadState) => {}) as GCConnectCallback,
	onDisconnect: ((_index: number) => {}) as GCDisconnectCallback,
	onBeforeCycle: (() => {}) as GCCallback,
	onAfterCycle: (() => {}) as GCCallback,
	getGamepads: function () {
		return this.gamepads;
	},
	getGamepad: function (id: number) {
		if (this.gamepads[id]) {
			return this.gamepads[id];
		}
		return null;
	},
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

			if (property === "axeThreshold") {
				const gps = this.getGamepads();
				const ids = Object.keys(gps);
				for (let x = 0; x < ids.length; x++) {
					gps[ids[x]].set("axeThreshold", this.axeThreshold);
				}
			}
		} else {
			error(MESSAGES.INVALID_PROPERTY);
		}
	},
	checkStatus: () => {
		const requestAnimationFrame = (
			window.requestAnimationFrame ||
			(window as WindowWithWebkitRAF).webkitRequestAnimationFrame
		).bind(window);
		const gamepadIds = Object.keys(gameControl.gamepads);

		gameControl.onBeforeCycle();

		for (let x = 0; x < gamepadIds.length; x++) {
			gameControl.gamepads[gamepadIds[x]].checkStatus();
		}

		gameControl.onAfterCycle();

		if (gamepadIds.length > 0) {
			requestAnimationFrame(gameControl.checkStatus);
		}
	},
	init: function () {
		window.addEventListener("gamepadconnected", (e) => {
			// Get gamepad from standard GamepadEvent or custom event
			const egp: Gamepad | undefined =
				(e as GamepadEvent).gamepad ||
				(isCustomGamepadEvent(e) ? e.detail.gamepad : undefined);
			log(MESSAGES.ON);
			if (!window.gamepads) window.gamepads = {};
			if (egp) {
				if (!window.gamepads[egp.index]) {
					window.gamepads[egp.index] = egp;
					const gp = gamepad.init(egp);
					gp.set("axeThreshold", this.axeThreshold);
					this.gamepads[gp.id] = gp;
					this.onConnect(this.gamepads[gp.id]);
				}
				if (Object.keys(this.gamepads).length === 1) this.checkStatus();
			}
		});
		window.addEventListener("gamepaddisconnected", (e) => {
			// Get gamepad from standard GamepadEvent or custom event
			const egp: Gamepad | undefined =
				(e as GamepadEvent).gamepad ||
				(isCustomGamepadEvent(e) ? e.detail.gamepad : undefined);
			log(MESSAGES.OFF);
			if (egp) {
				delete window.gamepads[egp.index];
				delete this.gamepads[egp.index];
				this.onDisconnect(egp.index);
			}
		});
	},
	on: function (
		eventName: string,
		callback: GCCallback | GCConnectCallback | GCDisconnectCallback,
	) {
		switch (eventName) {
			case "connect":
				this.onConnect = callback as GCConnectCallback;
				break;
			case "disconnect":
				this.onDisconnect = callback as GCDisconnectCallback;
				break;
			case "beforeCycle":
			case "beforecycle":
				this.onBeforeCycle = callback as GCCallback;
				break;
			case "afterCycle":
			case "aftercycle":
				this.onAfterCycle = callback as GCCallback;
				break;
			default:
				error(MESSAGES.UNKNOWN_EVENT);
				break;
		}
		return this;
	},
	off: function (eventName: string) {
		switch (eventName) {
			case "connect":
				this.onConnect = (_gamepad: GamepadState) => {};
				break;
			case "disconnect":
				this.onDisconnect = (_index: number) => {};
				break;
			case "beforeCycle":
			case "beforecycle":
				this.onBeforeCycle = () => {};
				break;
			case "afterCycle":
			case "aftercycle":
				this.onAfterCycle = () => {};
				break;
			default:
				error(MESSAGES.UNKNOWN_EVENT);
				break;
		}
		return this;
	},
};

gameControl.init();

export default gameControl;
