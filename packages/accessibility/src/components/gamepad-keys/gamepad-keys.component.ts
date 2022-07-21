import { Component } from "@ribajs/core";
import { GamepadService } from "../../services/gamepad.service.js";
import { GamepadKeysComponentScope } from "../../types/index.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/index.js";

/**
 * @credits https://github.com/alvaromontoro/gamecontroller.js/blob/master/examples/example-4-snes-controller.html
 */
export class GamepadKeysComponent extends Component {
  public static tagName = "a11y-gamepad-keys";
  protected gamepad = GamepadService.getSingleton();
  public _debug = false;

  static get observedAttributes() {
    return [];
  }

  public scope: GamepadKeysComponentScope = {
    controls: {
      buttonB: {
        active: false,
      },
      buttonA: {
        active: false,
      },
      buttonY: {
        active: false,
      },
      buttonX: {
        active: false,
      },
      up: {
        active: false,
      },
      down: {
        active: false,
      },
      right: {
        active: false,
      },
      left: {
        active: false,
      },
      start: {
        active: false,
      },
      select: {
        active: false,
      },
      l: {
        active: false,
      },
      r: {
        active: false,
      },
    },
    connected: 0,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(GamepadKeysComponent.observedAttributes);
  }

  protected async afterBind() {
    this.gamepad
      .on("connect", (gamepad) => {
        this.scope.connected++;
        // UP
        gamepad.on("up0", () => {
          this.scope.controls.up.active = true;
        });
        // UP (Firefox bug)
        gamepad.on("up3", () => {
          this.scope.controls.up.active = true;
        });
        // UP
        gamepad.on("button12", () => {
          this.scope.controls.up.active = true;
        });
        // DOWN
        gamepad.on("down0", () => {
          this.scope.controls.down.active = true;
        });
        // DOWN (Firefox bug)
        gamepad.on("down3", () => {
          this.scope.controls.down.active = true;
        });
        // DOWN
        gamepad.on("button13", () => {
          this.scope.controls.down.active = true;
        });
        // LEFT
        gamepad.on("left0", () => {
          this.scope.controls.left.active = true;
        });
        // LEFT (Firefox bug)
        gamepad.on("left3", () => {
          this.scope.controls.left.active = true;
        });
        // LEFT
        gamepad.on("button14", () => {
          this.scope.controls.left.active = true;
        });
        // RIGHT
        gamepad.on("right0", () => {
          this.scope.controls.right.active = true;
        });
        // RIGHT (Firefox bug)
        gamepad.on("right3", () => {
          this.scope.controls.right.active = true;
        });
        // RIGHT
        gamepad.on("button15", () => {
          this.scope.controls.right.active = true;
        });
        // START
        gamepad.on("start", () => {
          this.scope.controls.start.active = true;
        });
        // START (Firefox bug)
        gamepad.on("button7", () => {
          this.scope.controls.start.active = true;
        });
        // SELECT
        gamepad.on("select", () => {
          this.scope.controls.select.active = true;
        });
        // SELECT (Firefox bug)
        gamepad.on("button6", () => {
          this.scope.controls.select.active = true;
        });
        // L
        gamepad.on("l1", () => {
          this.scope.controls.l.active = true;
        });
        // R
        gamepad.on("r1", () => {
          this.scope.controls.r.active = true;
        });
        // B
        gamepad.on("button0", () => {
          this.scope.controls.buttonB.active = true;
        });
        // A
        gamepad.on("button1", () => {
          this.scope.controls.buttonA.active = true;
        });
        // Y
        gamepad.on("button2", () => {
          this.scope.controls.buttonY.active = true;
        });
        // X
        gamepad.on("button3", () => {
          this.scope.controls.buttonX.active = true;
        });
      })
      .on("beforeCycle", () => {
        const buttons = Object.keys(this.scope.controls) as Array<
          keyof GamepadKeysComponentScope["controls"]
        >;
        for (const button of buttons) {
          this.scope.controls[button].active = false;
        }
      })
      .on("disconnect", () => {
        this.scope.connected--;
      });
  }

  protected async template() {
    if (!hasChildNodesTrim(this)) {
      const { default: template } = await import(
        "./gamepad-keys.component.pug"
      );
      return template(this.scope);
    } else {
      return null;
    }
  }
}
