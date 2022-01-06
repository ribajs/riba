export interface Button {
  active: boolean;
}

export type GamepadKeysComponentScope = {
  controls: {
    /** button0 */
    buttonB: Button;
    /** button1 */
    buttonA: Button;
    /** button2 */
    buttonY: Button;
    /** button3 */
    buttonX: Button;
    /** up1, button12 */
    up: Button;
    /** down1, button13 */
    down: Button;
    /** right1, button15 */
    right: Button;
    /** left1, button14 */
    left: Button;
    /** start */
    start: Button;
    /** start */
    select: Button;
    /** l1 */
    l: Button;
    /** r2 */
    r: Button;
  };
  connected: number;
};
