import { deferred } from "@ribajs/utils/src/control";
import { Transition } from "../../interfaces/transition";

/**
 * BaseTransition to extend
 */
export abstract class BaseTransition implements Transition {
  protected oldContainer?: HTMLElement;

  protected newContainer?: HTMLElement;

  protected newContainerLoading?: Promise<HTMLElement>;

  protected deferred: any; // TODO type

  protected action: "replace" | "append";

  constructor(action: "replace" | "append" = "replace") {
    this.action = action;
  }

  /**
   * This function is called from Pjax module to initialize
   * the transition.
   *
   */
  public init(
    oldContainer: HTMLElement,
    newContainer: Promise<HTMLElement>
  ): Promise<void> {
    this.oldContainer = oldContainer;

    this.deferred = deferred();
    const newContainerReady = deferred();
    this.newContainerLoading = newContainerReady.promise;

    this.start();

    newContainer.then((_newContainer: HTMLElement) => {
      this.newContainer = _newContainer;
      newContainerReady.resolve();
    });

    return this.deferred.promise;
  }

  /**
   * This function needs to be called as soon the Transition is finished
   */
  public done() {
    // this.oldContainer[0].parentNode.removeChild(this.oldContainer[]);
    if (!this.oldContainer) {
      throw new Error("Can't remove old container");
    }

    if (this.action === "replace") {
      this.oldContainer.remove();
    }
    // this.newContainer.style.visibility = 'visible';
    if (!this.newContainer) {
      throw new Error("Can't show new container");
    }
    this.newContainer.style.visibility = "visible";
    this.deferred.resolve();
  }

  /**
   * Constructor for your Transition
   */
  public abstract start(): any;
}
