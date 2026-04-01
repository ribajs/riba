import { BaseTransition } from "./BaseTransition.js";
import { Transition } from "../../types/transition.js";
import type { TransitionDefinition } from "../../types/transition-definition.js";

/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 */
export class FadeTransition extends BaseTransition implements Transition {
  protected scrollToTop: boolean;
  protected durationMs = 200;

  constructor(scrollToTop = true) {
    super("replace");
    this.scrollToTop = scrollToTop;
  }

  public async start() {
    if (!this.newContainerLoading) {
      throw new Error("this.newContainerLoading is not set");
    }

    if (this.oldContainer) {
      this.oldContainer.style.transition = `opacity ${this.durationMs}ms`;
      this.oldContainer.style.opacity = "0";
    }

    const newContainer = await this.newContainerLoading;

    newContainer.style.opacity = "0";
    newContainer.style.transition = `opacity ${this.durationMs}ms`;

    setTimeout(() => {
      this.finish(newContainer);
    }, this.durationMs);

    return;
  }

  public async finish(newContainer: HTMLElement) {
    newContainer.style.opacity = "1";
    return this.done();
  }

  public static asDefinition(durationMs = 200): TransitionDefinition {
    const fadeOut = (el: HTMLElement): Promise<void> =>
      el
        .animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: durationMs,
          fill: "forwards",
        })
        .finished.then(() => undefined);

    const fadeIn = (el: HTMLElement): Promise<void> =>
      el
        .animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: durationMs,
          fill: "forwards",
        })
        .finished.then(() => undefined);

    return {
      name: "fade",
      leave: ({ current }) => {
        if (current.container) {
          return fadeOut(current.container);
        }
      },
      enter: ({ next }) => {
        if (next.container) {
          return fadeIn(next.container);
        }
      },
    };
  }
}
