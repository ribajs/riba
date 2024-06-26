import { Binder } from "@ribajs/core";
import { Collapse } from "../services/collapse.js";

/**
 *
 */
export class ToggleCollapseOnEventBinder extends Binder<string, HTMLElement> {
  static key = "bs5-toggle-collapse-on-*";

  private targets = new Map<HTMLElement, Collapse>();

  private _onEvent(event: Event) {
    event.preventDefault();
    for (const collapseService of this.targets.values()) {
      collapseService.toggle();
    }
  }

  private onEvent = this._onEvent.bind(this);

  bind(el: HTMLElement) {
    if (this.args === null) {
      throw new Error("args is null");
    }
    const eventName = this.args[0] as string;
    el.addEventListener(eventName, this.onEvent);
  }

  unbind() {
    const eventName = this.args[0] as string;
    this.el.removeEventListener(eventName, this.onEvent);
  }

  routine(el: HTMLElement, targetSelector: string) {
    const newTargets = Array.from(
      document.querySelectorAll<HTMLElement>(targetSelector),
    );

    if (newTargets.length <= 0) {
      console.warn(
        `[toggleCollapseOnEventBinder] No element with selector "${targetSelector}" found.`,
      );
    }

    for (const target of this.targets.keys()) {
      if (!newTargets.find((x) => x === target)) {
        this.targets.get(target)?.dispose();
        this.targets.delete(target);
      }
    }

    for (const target of newTargets) {
      if (!this.targets.has(target)) {
        this.targets.set(target, new Collapse(target, { toggle: false }));
      }
    }
  }
}
