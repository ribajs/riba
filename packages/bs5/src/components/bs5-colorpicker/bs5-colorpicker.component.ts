/**
 * Based on https://vanilla-picker.js.org/
 */

import Color from "@sphinxxxx/color-conversion";
import { Component, TemplateFunction } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import template from "./bs5-colorpicker.component.html";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { ColorPickerOptions } from "../../types/index.js";
import { debounce } from "@ribajs/utils/src/control";

interface EventBucketItem {
  target: HTMLElement | Window;
  type: Event["type"];
  handler: any;
}

class EventBucket {
  protected events: EventBucketItem[] = [];

  add(target: HTMLElement | Window, type: Event["type"], handler: any) {
    target.addEventListener(type, handler, false);
    this.events.push({
      target,
      type,
      handler,
    });
  }

  remove(target: HTMLElement, type: Event["type"], handler: any) {
    this.events = this.events.filter((e) => {
      let isMatch = true;
      if (target && target !== e.target) {
        isMatch = false;
      }
      if (type && type !== e.type) {
        isMatch = false;
      }
      if (handler && handler !== e.handler) {
        isMatch = false;
      }

      if (isMatch) {
        EventBucket._doRemove(e.target as HTMLElement, e.type, e.handler);
      }
      return !isMatch;
    });
  }
  static _doRemove(target: HTMLElement, type: Event["type"], handler: any) {
    target.removeEventListener(type, handler, false);
  }

  destroy() {
    this.events.forEach((e) =>
      EventBucket._doRemove(e.target as HTMLElement, e.type, e.handler)
    );
    this.events = [];
  }
}

const dragTrack = (
  eventBucket: EventBucket,
  area: HTMLElement,
  callback: any
) => {
  let dragging = false;

  const clamp = (val: number, min: number, max: number) => {
    return Math.max(min, Math.min(val, max));
  };

  const onMove = (
    e: MouseEvent | TouchEvent,
    info: { clientX: number; clientY: number },
    starting: boolean
  ) => {
    if (starting) {
      dragging = true;
    }
    if (!dragging) {
      return;
    }

    e.preventDefault();

    const bounds = area.getBoundingClientRect(),
      w = bounds.width,
      h = bounds.height,
      x = info.clientX,
      y = info.clientY;

    const relX = clamp(x - bounds.left, 0, w),
      relY = clamp(y - bounds.top, 0, h);

    callback(relX / w, relY / h);
  };

  const onMouse = (e: MouseEvent, starting: boolean) => {
    const button = e.buttons === undefined ? e.which : e.buttons;
    if (button === 1) {
      onMove(e, e, starting);
    }
    // `mouseup` outside of window:
    else {
      dragging = false;
    }
  };

  function onTouch(e: TouchEvent, starting: boolean) {
    if (e.touches.length === 1) {
      onMove(e, e.touches[0], starting);
    }
    //Don't interfere with pinch-to-zoom etc:
    else {
      dragging = false;
    }
  }

  // Notice how we must listen on the whole window to really keep track of mouse movements,
  // while touch movements "stick" to the original target from `touchstart` (which works well for our purposes here):
  //
  //  https://stackoverflow.com/a/51750458/1869660
  //  "Mouse moves = *hover* like behavior. Touch moves = *drags* like behavior"
  //
  eventBucket.add(area, "mousedown", (e: MouseEvent) => {
    onMouse(e, true);
  });
  eventBucket.add(area, "touchstart", (e: TouchEvent) => {
    onTouch(e, true);
  });
  eventBucket.add(window, "mousemove", onMouse);
  eventBucket.add(area, "touchmove", onTouch);
  eventBucket.add(window, "mouseup", () => {
    dragging = false;
  });
  eventBucket.add(area, "touchend", () => {
    dragging = false;
  });
  eventBucket.add(area, "touchcancel", () => {
    dragging = false;
  });
};

const BG_TRANSP = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='2' height='2'%3E%3Cpath d='M1,0H0V1H2V2H1' fill='lightgrey'/%3E%3C/svg%3E")`;
const HUES = 360;
// We need to use keydown instead of keypress to handle Esc from the editor textbox:
const EVENT_KEY = "keydown"; //'keypress'

function stopEvent(e: Event) {
  // Stop an event from bubbling up to the parent:
  e.preventDefault();
  e.stopPropagation();
}
function onKey(
  bucket: EventBucket,
  target: HTMLElement,
  keys: string[],
  handler: any,
  stop = false
) {
  bucket.add(target, EVENT_KEY, function (e: KeyboardEvent) {
    if (keys.indexOf(e.key) >= 0) {
      if (stop) {
        stopEvent(e);
      }
      handler(e);
    }
  });
}

interface Scope extends ColorPickerOptions {
  namespace: string;
  hsl: number[];
  cssHue: string;
  cssHsl: string;
  cssHsla: string;
  alphaBg: string;
}

export class Bs5ColorPickerComponent extends Component {
  public static tagName = "bs5-colorpicker";
  static get observedAttributes(): string[] {
    return [
      "namespace",
      "alpha",
      "editor",
      "editor-format",
      "cancel-button",
      "okay-button",
      "color",
    ];
  }

  protected eventDispatcher?: EventDispatcher;

  public color?: Color;
  public _debug = false;
  public scope: Scope = {
    namespace: "main",
    hsl: [],
    cssHue: "",
    cssHsl: "",
    cssHsla: "",
    alphaBg: "",
    color: "#0cf",
    alpha: true,
    editor: true,
    editorFormat: "hex",
    cancelButton: false,
    okayButton: false,
  };

  protected events = new EventBucket();

  protected _domH: HTMLElement | null = null;
  protected _domSL: HTMLElement | null = null;
  protected _domA: HTMLElement | null = null;
  protected _domEdit: HTMLInputElement | null = null;
  protected _domSample: HTMLElement | null = null;
  protected _domOkay: HTMLElement | null = null;
  protected _domCancel: HTMLElement | null = null;

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(Bs5ColorPickerComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.eventDispatcher = EventDispatcher.getInstance(
      "bs5-colorpicker:" + this.scope.namespace
    );
    this.setColor(this.scope.color);
    this.updateUI();
    this.bindEvents();
  }

  protected async afterTemplate(
    template: string | HTMLElement | null
  ): Promise<any> {
    await super.afterTemplate(template);
    this.setElements();
  }

  /**
   * Callback whenever the color changes.
   */
  protected onChange(color?: Color) {
    this.debug("onChange", color);
    this.eventDispatcher?.trigger("change", color);
  }

  /**
   * Callback when the user clicks "Ok".
   */
  protected onDone(color?: Color) {
    this.debug("onDone", color);
    this.eventDispatcher?.trigger("done", color);
  }

  protected template(): ReturnType<TemplateFunction> {
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
    if (attributeName === "color") {
      this.setColor(this.scope.color);
    }
  }

  /**
   * Set/initialize the picker's color.
   *
   * @param color Color name, RGBA/HSLA/HEX string, or RGBA array.
   * @param flags If { silent: true }, won't trigger onChange.
   */
  protected setColor = debounce(this._setColor.bind(this));

  protected _setColor(color: string, flags: any = { silent: false }) {
    if (typeof color === "string") {
      color = color.trim();
    }
    if (!color) {
      return;
    }

    flags = flags || {};
    let c;
    try {
      // Will throw on unknown colors:
      c = new Color(color);
    } catch (ex) {
      if (flags.failSilently) {
        return;
      }
      throw ex;
    }

    if (!this.scope.alpha) {
      const hsla = c.hsla;
      hsla[3] = 1;
      c.hsla = hsla;
    }
    this.color = c;
    this.setHSLA(null, null, null, null, flags);
  }

  protected setElements() {
    this._domH = this.querySelector(".picker-hue");
    this._domSL = this.querySelector(".picker-sl");
    this._domA = this.querySelector(".picker-alpha");
    this._domEdit =
      (this.querySelector(".picker-editor") as HTMLInputElement) || null;
    this._domSample = this.querySelector(".picker-sample");
    this._domOkay = this.querySelector(".picker-done");
    this._domCancel = this.querySelector(".picker-cancel");
  }

  /**
   * Release all resources used by this picker instance.
   */
  protected disconnectedCallback() {
    this.events.destroy();
  }

  /**
   * Handle user input.
   */
  protected bindEvents() {
    const events = this.events;

    const addEvent = (
      target: HTMLElement | HTMLInputElement,
      type: Event["type"],
      handler: any
    ) => {
      events.add(target, type, handler);
    };

    // Prevent clicks while dragging from bubbling up to the parent:
    addEvent(this, "click", (e: MouseEvent) => e.preventDefault());

    // Draggable color selection
    const _dragTrack = dragTrack.bind(this);

    // Select hue
    if (
      !this._domH ||
      !this._domSL ||
      !this._domA ||
      !this._domEdit ||
      !this._domOkay
    ) {
      throw new Error("Not ready!");
    }
    _dragTrack(events, this._domH, (x: number /*, y: number*/) =>
      this.setHSLA(x)
    );

    // Select saturation/lightness
    _dragTrack(events, this._domSL, (x: number, y: number) =>
      this.setHSLA(null, x, 1 - y)
    );

    // Select alpha
    if (this.scope.alpha) {
      _dragTrack(events, this._domA, (x: number, y: number) =>
        this.setHSLA(null, null, null, 1 - y)
      );
    }

    //Always init the editor, for accessibility and screen readers (we'll hide it with CSS if `!settings.editor`)
    addEvent(this._domEdit, "input", (e: InputEvent) => {
      const input = e.target as HTMLInputElement;
      this.setColor(input.value, {
        fromEditor: true,
        failSilently: true,
      });
    });
    // Select all text on focus:
    addEvent(this._domEdit, "focus", (e: FocusEvent) => {
      const input = e.target as HTMLInputElement;
      //If no current selection:
      if (input.selectionStart === input.selectionEnd) {
        input.select();
      }
    });

    const onDoneProxy = () => {
      this.onDone(this.color);
    };
    addEvent(this._domOkay, "click", onDoneProxy);
    onKey(events, this, ["Enter"], onDoneProxy);
  }

  /*
   * "Hub" for all color changes
   *
   * @private
   */
  protected setHSLA(
    h: number | null = null,
    s: number | null = null,
    l: number | null = null,
    a: number | null = null,
    flags: any = {}
  ) {
    if (!this.color) {
      throw new Error("Not ready!");
    }
    const hsla = this.color.hsla;

    [h, s, l, a].forEach((x, i) => {
      if (x || x === 0) {
        hsla[i] = x;
      }
    });
    this.color.hsla = hsla;

    this.updateUI(flags);

    if (this.onChange && !flags.silent) {
      this.onChange(this.color);
    }
  }

  protected updateUI = debounce(this._updateUI.bind(this));

  protected _updateUI(flags: any = {}) {
    if (!this || !this.color) {
      return;
    }

    this.scope.hsl = this.color.hsla;
    this.scope.cssHue = `hsl(${this.scope.hsl[0] * HUES}, 100%, 50%)`;
    this.scope.cssHsl = this.color.hslString;
    this.scope.cssHsla = this.color.hslaString;

    if (!this._domH || !this._domSL || !this._domA) {
      throw new Error("Color ui elements not found!");
    }

    const thumbH = this._domH.querySelector(
      ".picker-selector"
    ) as HTMLElement | null;
    const thumbSL = this._domSL.querySelector(
      ".picker-selector"
    ) as HTMLElement | null;
    const thumbA = this._domA.querySelector(
      ".picker-selector"
    ) as HTMLElement | null;

    if (!thumbH || !thumbSL || !thumbA || !this._domEdit || !this._domSample) {
      console.error(
        thumbH,
        thumbSL,
        thumbA,
        this._domA,
        this._domSL,
        this._domH,
        this._domEdit,
        this._domSample
      );
      throw new Error("Not ready!");
    }

    const posX = (parent: HTMLElement, child: HTMLElement, relX: number) => {
      child.style.left = relX * 100 + "%";
    };
    const posY = (parent: HTMLElement, child: HTMLElement, relY: number) => {
      child.style.top = relY * 100 + "%";
    };

    posX(this._domH, thumbH, this.scope.hsl[0]);

    // S/L
    posX(this._domSL, thumbSL, this.scope.hsl[1]);
    posY(this._domSL, thumbSL, 1 - this.scope.hsl[2]);

    // Alpha
    posY(this._domA, thumbA, 1 - this.scope.hsl[3]);

    const opaque = this.scope.cssHsl;
    const transp = opaque.replace("hsl", "hsla").replace(")", ", 0)");
    const bg = `linear-gradient(${[opaque, transp]})`;

    // Let the Alpha slider fade from opaque to transparent:
    this.scope.alphaBg = bg + ", " + BG_TRANSP;

    // Don't update the editor if the user is typing.
    // That creates too much noise because of our auto-expansion of 3/4/6 -> 8 digit hex codes.
    if (!flags.fromEditor) {
      const format = this.scope.editorFormat,
        alpha = this.scope.alpha;

      let color: string;
      switch (format) {
        case "rgb":
          color = this.color.printRGB(alpha);
          break;
        case "hsl":
          color = this.color.printHSL(alpha);
          break;
        default:
          color = this.color.printHex(alpha);
      }
      this.scope.color = color;
    }
  }
}
