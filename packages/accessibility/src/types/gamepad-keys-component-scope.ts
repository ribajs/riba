import type { InputButton } from "./input-button.js";

export interface GamepadKeysComponentScope {
  controls: {
    /** button0 */
    buttonB: InputButton;
    /** button1 */
    buttonA: InputButton;
    /** button2 */
    buttonY: InputButton;
    /** button3 */
    buttonX: InputButton;
    /** up1, button12 */
    up: InputButton;
    /** down1, button13 */
    down: InputButton;
    /** right1, button15 */
    right: InputButton;
    /** left1, button14 */
    left: InputButton;
    /** start */
    start: InputButton;
    /** start */
    select: InputButton;
    /** l1 */
    l: InputButton;
    /** r2 */
    r: InputButton;
  };
  connected: number;
}
