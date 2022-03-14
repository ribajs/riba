import { deferred } from "@ribajs/utils/src/index.js";
import { Transition } from "../../types/transition";

/**
 * BaseTransition to extend
 */
export abstract class BaseTransition implements Transition {
  protected oldContainer?: HTMLElement;

  protected newContainer?: HTMLElement;

  protected newContainerLoading?: Promise<HTMLElement>;

  protected deferred = deferred();

  protected action: "replace" | "append";

  constructor(action: "replace" | "append" = "replace") {
    this.action = action;
  }

  /**
   * This function is called from Pjax module to initialize
   * the transition.
   *
   */
  public async init(
    oldContainer: HTMLElement,
    newContainer: Promise<HTMLElement>
  ): Promise<void> {
    this.oldContainer = oldContainer;

    this.deferred = deferred();
    const newContainerLoading = deferred<HTMLElement>();
    this.newContainerLoading = newContainerLoading.promise;

    this.start();

    this.newContainer = await newContainer;
    newContainerLoading.resolve(this.newContainer);
    return this.deferred.promise;
  }

  /**
   * This function needs to be called as soon the Transition is finished
   */
  public async done() {
    if (!this.oldContainer) {
      throw new Error("Can't remove old container");
    }

    if (this.action === "replace") {
      this.oldContainer.remove();
    }

    if (!this.newContainer) {
      throw new Error("Can't show new container");
    }
    this.newContainer.style.visibility = "visible";
    return this.deferred.resolve(undefined);
  }

  /**
   * Constructor for your Transition
   */
  public abstract start(): void;
}
