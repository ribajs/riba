import { BaseTransition } from "./BaseTransition.js";
import { Transition } from "../../types/transition.js";
import { scrollToPosition } from "@ribajs/utils/src/index.js";

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

    if (this.scrollToTop) {
      await scrollToPosition(window, "start", "vertical", "smooth");
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
}
