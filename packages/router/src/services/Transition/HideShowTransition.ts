import { BaseTransition } from "./BaseTransition.js";
import { Transition } from "../../types/transition.js";
import type { TransitionDefinition } from "../../types/transition-definition.js";

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

  public static asDefinition(): TransitionDefinition {
    return {
      name: "hide-show",
      leave: ({ current }) => {
        if (current.container) {
          current.container.style.display = "none";
        }
      },
    };
  }
}
