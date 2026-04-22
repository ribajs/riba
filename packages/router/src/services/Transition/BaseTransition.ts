import { deferred } from "@ribajs/utils";
import { Transition } from "../../types/transition.js";

/**
 * BaseTransition to extend
 */
export abstract class BaseTransition implements Transition {
  protected oldContainer?: HTMLElement;

  /**
   * Primary new container (first of the new page's top-level children).
   *
   * @deprecated Prefer {@link newContainers} in transition subclasses so multi-child
   * outlets are handled. `newContainer` equals `newContainers[0]` and is retained for
   * backward compatibility with existing `Transition` implementations.
   */
  protected newContainer?: HTMLElement;

  /**
   * Every container appended to the outlet for the new page. Populated by Pjax
   * via {@link setNewContainers} when the outlet holds multiple siblings. Falls
   * back to `[newContainer]` in `done()` so single-child outlets behave exactly
   * like before.
   */
  protected newContainers?: HTMLElement[];

  protected newContainerLoading?: Promise<HTMLElement>;

  protected deferred = deferred();

  protected action: "replace" | "append";

  constructor(action: "replace" | "append" = "replace") {
    this.action = action;
  }

  /**
   * Register the complete set of elements that were appended to the outlet for
   * the new page. Pjax calls this before {@link done} so transitions preserve
   * every sibling of a multi-child page instead of only the primary container.
   */
  public setNewContainers(containers: HTMLElement[]) {
    this.newContainers = containers.length > 0 ? containers : undefined;
  }

  /**
   * This function is called from Pjax module to initialize
   * the transition.
   *
   */
  public async init(
    oldContainer: HTMLElement,
    newContainer: Promise<HTMLElement>,
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
      /**
       * `router-view` may have multiple direct children (e.g. layout slots). PJAX appends
       * the full set of new page children via {@link setNewContainers}; we clear every
       * sibling in the shared parent that isn't one of them so the outlet matches a full
       * page swap without dropping legitimate multi-child content.
       */
      const newSet = new Set<Node>(
        this.newContainers ?? (this.newContainer ? [this.newContainer] : []),
      );
      const parent = this.newContainer?.parentElement ?? null;
      if (
        parent &&
        newSet.size > 0 &&
        this.oldContainer.parentNode === parent
      ) {
        for (const node of Array.from(parent.childNodes)) {
          if (!newSet.has(node)) {
            node.remove();
          }
        }
      } else {
        this.oldContainer.remove();
      }
    }

    if (!this.newContainer) {
      throw new Error("Can't show new container");
    }
    for (const el of this.newContainers ?? [this.newContainer]) {
      el.style.visibility = "visible";
    }
    return this.deferred.resolve(undefined);
  }

  /**
   * Constructor for your Transition
   */
  public abstract start(): void;
}
