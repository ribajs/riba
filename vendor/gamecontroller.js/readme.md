# @ribajs/gameController.js

A JavaScript library that lets you handle, configure, and use gamepad and controllers on a browser.

**Version 2.0.0** - Enhanced fork with improved TypeScript support, additional constants, and better controller detection.

[![npm](https://img.shields.io/npm/v/@ribajs/gamecontroller.js.svg)](https://www.npmjs.com/package/@ribajs/gamecontroller.js)
[![npm](https://img.shields.io/npm/l/@ribajs/gamecontroller.js.svg)](https://www.npmjs.com/package/@ribajs/gamecontroller.js)

## Getting started

@ribajs/gameController.js is a lightweight library (~9KB minified) written in TypeScript that uses the standard [Gamepad API](https://w3c.github.io/gamepad/), and does not have any plugin/library dependencies.

### What's New in 2.0

- ✅ Full TypeScript support with type definitions
- ✅ `GAMEPAD_BUTTONS` and `GAMEPAD_AXES` constants for W3C standard gamepad mapping
- ✅ `controllerId` property for automatic controller type detection
- ✅ Enhanced `GamepadState` interface (formerly `GCGamepad`)
- ✅ Improved event handling and performance
- ✅ Better browser compatibility

## Installation

From npm:

```bash
npm i @ribajs/gamecontroller.js
```

From yarn:

```bash
yarn add @ribajs/gamecontroller.js
```

From pnpm:

```bash
pnpm add @ribajs/gamecontroller.js
```

Directly into your webpage (check [latest release on github](https://github.com/PixelRPG/gamecontroller.js/releases)):

```html
<script src="./gamecontroller.min.js"></script>
```



## Usage

### ES6 Modules

```typescript
import { gameControl, GAMEPAD_BUTTONS, GAMEPAD_AXES } from '@ribajs/gamecontroller.js';

gameControl.on('connect', (gamepad) => {
  console.log(`Controller connected: ${gamepad.controllerId}`);
  
  // Use constants for better readability
  gamepad.before(`button${GAMEPAD_BUTTONS.BUTTON_BOTTOM}`, () => {
    console.log('A/Cross button pressed!');
  });
  
  // Or use aliases
  gamepad.on('up', moveCharacterUp);
});
```

### CommonJS

```javascript
const { gameControl, GAMEPAD_BUTTONS } = require('@ribajs/gamecontroller.js');

gameControl.on('connect', function(gamepad) {
  gamepad.on('up', moveCharacterUp);
});
```

### Browser Script Tag

After importing the library into your webpage, `gameControl` will be available globally. This object comes with a series of properties and methods that will allow to handle the different gamepads connected to the computer. 

The connected gamepads will be stored in a list of `GamepadState` objects in `gameControl`. **This `GamepadState` object is not the default one returned by the browser** but a higher-level interface to interact with it and simplify its usability.

```javascript
gameControl.on('connect', function(gamepad) {
  gamepad.on('up', moveCharacterUp);
});
```

### Standard Gamepad Button Constants

The library exports `GAMEPAD_BUTTONS` and `GAMEPAD_AXES` constants matching the [W3C Gamepad API specification](https://w3c.github.io/gamepad/):

```typescript
import { GAMEPAD_BUTTONS, GAMEPAD_AXES } from '@ribajs/gamecontroller.js';

// Button indices (0-16)
GAMEPAD_BUTTONS.BUTTON_BOTTOM      // 0 - A (Xbox) / Cross (PS)
GAMEPAD_BUTTONS.BUTTON_RIGHT       // 1 - B (Xbox) / Circle (PS)
GAMEPAD_BUTTONS.BUTTON_LEFT        // 2 - X (Xbox) / Square (PS)
GAMEPAD_BUTTONS.BUTTON_TOP         // 3 - Y (Xbox) / Triangle (PS)
GAMEPAD_BUTTONS.BUMPER_LEFT        // 4 - LB/L1
GAMEPAD_BUTTONS.BUMPER_RIGHT       // 5 - RB/R1
GAMEPAD_BUTTONS.TRIGGER_LEFT       // 6 - LT/L2
GAMEPAD_BUTTONS.TRIGGER_RIGHT      // 7 - RT/R2
GAMEPAD_BUTTONS.BUTTON_CONTROL_LEFT   // 8 - Select/Back/Share
GAMEPAD_BUTTONS.BUTTON_CONTROL_RIGHT  // 9 - Start/Menu/Options
GAMEPAD_BUTTONS.BUTTON_JOYSTICK_LEFT  // 10 - Left stick click
GAMEPAD_BUTTONS.BUTTON_JOYSTICK_RIGHT // 11 - Right stick click
GAMEPAD_BUTTONS.D_PAD_UP           // 12
GAMEPAD_BUTTONS.D_PAD_BOTTOM       // 13
GAMEPAD_BUTTONS.D_PAD_LEFT         // 14
GAMEPAD_BUTTONS.D_PAD_RIGHT        // 15
GAMEPAD_BUTTONS.BUTTON_CONTROL_MIDDLE // 16 - Home/Guide/PS button

// Axis indices (0-3)
GAMEPAD_AXES.JOYSTICK_LEFT_HORIZONTAL   // 0
GAMEPAD_AXES.JOYSTICK_LEFT_VERTICAL     // 1
GAMEPAD_AXES.JOYSTICK_RIGHT_HORIZONTAL  // 2
GAMEPAD_AXES.JOYSTICK_RIGHT_VERTICAL    // 3
```

### Events for gameControl

For the object `gameControl`, events are associated using the `.on()` method:

```javascript
gameControl.on('connect', gamepad => {
  console.log('A new gamepad was connected!');
});
```

Here is a list of the events that can be associated using `.on()`:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>connect</code></td>
      <td>Triggered every time that a gamepad is connected to the browser. It returns an instance of the `gamepad` object described below.</td>
    </tr>
    <tr>
      <td valign="top"><code>disconnect</code></td>
      <td>Triggered when a gamepad is disconnected from the browser.</td>
    </tr>
    <tr>
      <td valign="top"><code>beforeCycle</code></td>
      <td>Triggered before the gamepads are checked for pressed buttons/joysticks movement (before those events are triggered).</td>
    </tr>
    <tr>
      <td valign="top"><code>afterCycle</code></td>
      <td>Triggered after the gamepads are checked for pressed buttons/joysticks movement (after those events have been triggered).</td>
    </tr>
  </tbody>
</table>


### Events for gamepad

The events for the `gamepad` objects work a little bit different. The event name, is the name of the button/direction that was activated (e.g. `button0`, `up`, etc.) And there are three functions that can be used to associate event handlers for them in different situations:

- `.on()`: triggered every cycle, while the button/joystick is pressed/active.
- `.before()`: triggered the first cycle that a button/joystick is pressed.
- `.after()`: triggered the first cycle after a button/joystick stopped being pressed.

All three functions can be chained and allow two parameters: the first one is the button/direction that was activated, and the second parameter is the callback function. Example:

```javascript
gamepad.on('button0',     () => { console.log('Button 0 still pressed...'); })
       .before('button0', () => { console.log('Button 0 pressed...');       })
       .after('button0',  () => { console.log('Button 0 was released';      });
```

To see the event flow and how the different events are lined-up and interact with each other, check the examples in the `examples/` folder.

These are the _events_ that can be passed as first parameter to the event functions:

<table>
  <thead>
    <tr>
      <th>Name</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td valign="top"><code>button0</code></td>
      <td>Triggered when button 0 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button1</code></td>
      <td>Triggered when button 1 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button2</code></td>
      <td>Triggered when button 2 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button3</code></td>
      <td>Triggered when button 3 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button4</code></td>
      <td>Triggered when button 4 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button5</code></td>
      <td>Triggered when button 5 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button6</code></td>
      <td>Triggered when button 6 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button7</code></td>
      <td>Triggered when button 7 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button8</code></td>
      <td>Triggered when button 8 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button9</code></td>
      <td>Triggered when button 9 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button10</code></td>
      <td>Triggered when button 10 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button11</code></td>
      <td>Triggered when button 11 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button12</code></td>
      <td>Triggered when button 12 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button13</code></td>
      <td>Triggered when button 13 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button14</code></td>
      <td>Triggered when button 14 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button15</code></td>
      <td>Triggered when button 15 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>button16</code></td>
      <td>Triggered when button 16 is pressed.</td>
    </tr>
    <tr>
      <td valign="top"><code>up0</code></td>
      <td>Triggered when the first axe/joystick is moved up.</td>
    </tr>
    <tr>
      <td valign="top"><code>down0</code></td>
      <td>Triggered when the first axe/joystick is moved down.</td>
    </tr>
    <tr>
      <td valign="top"><code>right0</code></td>
      <td>Triggered when the first axe/joystick is moved right.</td>
    </tr>
    <tr>
      <td valign="top"><code>left0</code></td>
      <td>Triggered when the first axe/joystick is moved left.</td>
    </tr>
    <tr>
      <td valign="top"><code>up1</code></td>
      <td>Triggered when the second axe/joystick is moved up.</td>
    </tr>
    <tr>
      <td valign="top"><code>down1</code></td>
      <td>Triggered when the second axe/joystick is moved down.</td>
    </tr>
    <tr>
      <td valign="top"><code>right1</code></td>
      <td>Triggered when the second axe/joystick is moved right.</td>
    </tr>
    <tr>
      <td valign="top"><code>left1</code></td>
      <td>Triggered when the second axe/joystick is moved left.</td>
    </tr>
    <tr>
      <td valign="top"><code>start</code></td>
      <td>Triggered when Start button is pressed.<br>This is an alias for event <code>button9</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>select</code></td>
      <td>Triggered when Select button is pressed.<br>This is an alias for event <code>button8</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>power</code></td>
      <td>Triggered when Power button is pressed (e.g. the Xbox logo in an Xbox controller).<br>This is an alias for event <code>button16</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>l1</code></td>
      <td>Triggered when the left back button 1 is pressed.<br>This is an alias for event <code>button4</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>l2</code></td>
      <td>Triggered when left back button 2 is pressed.<br>This is an alias for event <code>button6</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>r1</code></td>
      <td>Triggered when right back button 1 is pressed.<br>This is an alias for event <code>button5</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>r2</code></td>
      <td>Triggered when right back button 2 is pressed.<br>This is an alias for event <code>button7</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>up</code></td>
      <td>Triggered when the main/first axe/joystick is moved up.<br>This is an alias for event <code>up0</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>down</code></td>
      <td>Triggered when the main/first axe/joystick is moved down.<br>This is an alias for event <code>down0</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>right</code></td>
      <td>Triggered when the main/first axe/joystick is moved right.<br>This is an alias for event <code>right0</code>.</td>
    </tr>
    <tr>
      <td valign="top"><code>left</code></td>
      <td>Triggered when the main/first axe/joystick is moved left.<br>This is an alias for event <code>left0</code>.</td>
    </tr>
  </tbody>
</table>

These names are not arbitrary. They match the buttons and axes described in the [W3C Gamepad API specification](https://w3c.github.io/gamepad/#fig-visual-representation-of-a-standard-gamepad-layout):

![Standard Gamepad Layout](https://raw.githubusercontent.com/PixelRPG/gamecontroller.js/master/public/gamepad.svg)

## TypeScript Support

The library is written in TypeScript and includes full type definitions:

```typescript
import { gameControl, GamepadState, GAMEPAD_BUTTONS } from '@ribajs/gamecontroller.js';

gameControl.on('connect', (gamepad: GamepadState) => {
  // gamepad is fully typed
  console.log(`Controller: ${gamepad.controllerId}`);
  console.log(`Buttons: ${gamepad.buttons}`);
  console.log(`Axes: ${gamepad.axes}`);
  
  // Use typed constants
  gamepad.before(`button${GAMEPAD_BUTTONS.BUTTON_BOTTOM}`, () => {
    console.log('Primary action button pressed!');
  });
});
```

### GamepadState Interface

The `GamepadState` interface extends the native Gamepad API with additional properties:

```typescript
interface GamepadState {
  id: number;                    // Gamepad index (0, 1, 2, 3)
  controllerId: string;          // Controller ID string (e.g., "Xbox 360 Controller")
  buttons: number;               // Number of buttons
  axes: number;                  // Number of axes (joysticks * 2)
  mapping: GamepadMappingType;   // "standard" or ""
  vibration: boolean;            // Haptic feedback support
  // ... and more
}
```


## Browser Support

| ![Edge Logo 32x32](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/edge/edge_32x32.png)<br>Edge | ![Firefox Logo](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/archive/firefox_23-56/firefox_23-56_32x32.png)<br>Firefox | ![Chrome](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/archive/chrome_12-48/chrome_12-48_32x32.png)<br>Chrome | ![Safari Logo](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/archive/safari_1-7/safari_1-7_32x32.png)<br>Safari | ![Opera logo](https://cdnjs.cloudflare.com/ajax/libs/browser-logos/56.3.2/opera/opera_32x32.png)<br>Opera |
| ---- | ------- | ------ | ------ | ----- |
| 12+  | 29+     | 25+    | 10.1+  | 24+   |


## Examples

The `examples` folder contains different examples to showcase how to use the library. To try out the examples locally run `npm run serve` in the root of this repository or try them now directly here:

- [Connectivity](https://htmlpreview.github.io/?https://github.com/PixelRPG/gamecontroller.js/blob/master/examples/example-0-connectivity.html): shows how to detect if a gamepad was connected/disconnected.
- [Buttons and Joysticks](https://htmlpreview.github.io/?https://github.com/PixelRPG/gamecontroller.js/blob/master/examples/example-3-buttons-and-joysticks.html): see how the buttons from your gamepad map to the default gamepad.
- [SNES Controller](https://htmlpreview.github.io/?https://github.com/PixelRPG/gamecontroller.js/blob/master/examples/example-4-snes-controller.html): replica of a SNES controller (based on a previous CodePen demo).
- [Alvanoid](https://htmlpreview.github.io/?https://github.com/PixelRPG/gamecontroller.js/blob/master/examples/example-5-alvanoid.html): small Arkanoid-based game (based on a previous CodePen demo).
- [Pong](https://htmlpreview.github.io/?https://github.com/PixelRPG/gamecontroller.js/blob/master/examples/example-6-multiplayer.html): multiplayer demo with the classic game Pong for 2 players on 2 gamepads.

## Credits

This is an enhanced fork of the original [gamecontroller.js](https://github.com/alvaromontoro/gamecontroller.js) by Alvaro Montoro. 

### Changes in this fork:
- Full TypeScript rewrite with type definitions
- Added `GAMEPAD_BUTTONS` and `GAMEPAD_AXES` constants
- Added `controllerId` property for automatic controller detection
- Improved event handling
- Enhanced browser compatibility
- Better Node.js/SSR support
