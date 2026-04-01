import { BaseTransition } from "./BaseTransition.js";
import { Transition } from "../../types/transition.js";
import type { TransitionDefinition } from "../../types/transition-definition.js";

declare global {
  // tslint:disable: interface-name
  interface Window {
    model: any;
  }
}

/**
 * Basic Transition object, wait for the new Container to be ready,
 * scroll top, and finish the transition (removing the old container and displaying the new one)
 *
 * @private
 */
class CustomTransition extends BaseTransition implements Transition {
  public async start() {
    if (!this.newContainerLoading) {
      throw new Error("this.newContainerLoading is not set");
    }
    await this.newContainerLoading;
    this.finish();
    return;
  }

  public async finish() {
    document.body.scrollTop = 0;
    return this.done();
  }

  public static asDefinition(): TransitionDefinition {
    return {
      name: "custom",
      afterEnter: () => {
        document.body.scrollTop = 0;
      },
    };
  }
}

export { CustomTransition };
