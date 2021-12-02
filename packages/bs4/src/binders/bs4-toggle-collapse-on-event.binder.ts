import { Binder } from "@ribajs/core";
import { CollapseService } from "../services/collapse.service";

export interface Bs4CollapseOnEventBinder extends Binder<boolean> {
  onEvent: (event: Event) => void;
  collapseServices: CollapseService[];
  targets: NodeListOf<HTMLElement>;
}

/**
 *
 */
export class ToggleCollapseOnEventBinder extends Binder<
  string,
  HTMLInputElement
> {
  static key = "bs4-toggle-collapse-on-*";

  private targets = new Map<HTMLElement, CollapseService>();

  private _onEvent(event: Event) {
    event.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    for (const collapseService of this.targets.values()) {
      collapseService.toggle();
    }
  }

  private onEvent = this._onEvent.bind(this);

  bind(el: HTMLElement) {
    this.onEvent = this.onEvent.bind(this);
    if (this.args === null) {
      throw new Error("args is null");
    }
    const eventName = this.args[0] as string;
    el.addEventListener(eventName, this.onEvent, { passive: true });
  }

  unbind() {
    const eventName = this.args[0] as string;
    this.el.removeEventListener(eventName, this.onEvent);
  }

  routine(el: HTMLElement, targetSelector: string) {
    const newTargets = Array.from(
      document.querySelectorAll<HTMLElement>(targetSelector)
    );

    if (newTargets.length <= 0) {
      console.warn(
        `[toggleCollapseOnEventBinder] No element with selector "${targetSelector}" found.`
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
        this.targets.set(
          target,
          new CollapseService(target, [el], { toggle: false })
        );
      }
    }
    // onStateChange();
  }
}
