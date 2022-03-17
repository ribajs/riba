import { BaseTransition } from "./BaseTransition.js";
import { Transition } from "../../types/transition.js";
import { scrollToPosition } from "@ribajs/utils/src/index.js";

/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 */
export class HideShowTransition extends BaseTransition implements Transition {
  protected action: "replace" | "append";

  protected scrollToTop: boolean;

  constructor(action: "replace" | "append" = "replace", scrollToTop = true) {
    super(action);
    this.action = action;
    this.scrollToTop = scrollToTop;
  }

  public async start() {
    if (!this.newContainerLoading) {
      throw new Error("this.newContainerLoading is not set");
    }
    if (this.oldContainer) {
      this.oldContainer.style.display = "none";
    }

    if (this.scrollToTop) {
      await scrollToPosition(window, "start", "vertical", "smooth");
    }

    await this.newContainerLoading;

    await this.finish();

    if (this.oldContainer) {
      this.oldContainer.style.display = "";
    }

    return;
  }

  public async finish() {
    return this.done();
  }
}
