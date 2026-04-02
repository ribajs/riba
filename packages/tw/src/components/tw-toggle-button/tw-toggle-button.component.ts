/**
 * This component is used to trigger a toggle event used in other components or
 * parts of your project. It uses the EventDispatcher to communicate with target
 * components via a shared namespace.
 *
 * @attribute "target-id" (Required) The id with which the toggle event is triggered
 * @method toggle Triggers the toggle event
 * @property state Can be 'hidden', 'added', 'removed', or a positional state
 * @property isActive Is true if the state is not 'hidden', 'removed', or 'undefined'
 * @property targetId Passed attribute value, see `target-id` attribute
 */

import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { TOGGLE_BUTTON } from "../../constants/index.js";

type State =
  | "undefined"
  | "overlay-left"
  | "overlay-right"
  | "side-left"
  | "side-right"
  | "hidden"
  | "added"
  | "removed";

interface Scope extends ScopeBase {
  targetId?: string;
  toggle: TwToggleButtonComponent["toggle"];
  state: State;
  isActive: boolean;
}

export class TwToggleButtonComponent extends Component {
  static get observedAttributes(): string[] {
    return ["target-id"];
  }

  protected requiredAttributes(): string[] {
    return ["target-id"];
  }

  public static tagName = "tw-toggle-button";

  protected autobind = true;

  protected eventDispatcher?: EventDispatcher;

  protected lifecycleEvents = EventDispatcher.getInstance("lifecycle");

  public scope: Scope = {
    targetId: undefined,
    toggle: this.toggle.bind(this),
    state: "undefined",
    isActive: true,
  };

  constructor() {
    super();
    this.lifecycleEvents.once(
      "ComponentLifecycle:allBound",
      this.onAllComponentsReady,
      this,
    );
  }

  public toggle() {
    if (this.eventDispatcher) {
      this.eventDispatcher.trigger(
        TOGGLE_BUTTON.eventNames.toggle,
        this.scope.targetId,
      );
    }
  }

  protected onAllComponentsReady() {
    // Trigger init to request current state from all connected components
    this.eventDispatcher?.trigger(
      TOGGLE_BUTTON.eventNames.init,
      this.scope.targetId,
    );
  }

  protected async afterBind() {
    await super.afterBind();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwToggleButtonComponent.observedAttributes);
  }

  protected onToggledEvent(state: State) {
    this.scope.state = state;
    this.scope.isActive = state !== "hidden" && state !== "removed";
  }

  protected initEventDispatcher(id: string) {
    if (this.eventDispatcher) {
      this.eventDispatcher.off(
        TOGGLE_BUTTON.eventNames.toggled,
        this.onToggledEvent,
        this,
      );
    }
    const namespace = TOGGLE_BUTTON.nsPrefix + id;
    this.eventDispatcher = new EventDispatcher(namespace);
    this.eventDispatcher.on(
      TOGGLE_BUTTON.eventNames.toggled,
      this.onToggledEvent,
      this,
    );
    // Triggered state triggered by `..trigger('init', ...`
    this.eventDispatcher.on(
      TOGGLE_BUTTON.eventNames.state,
      this.onToggledEvent,
      this,
    );
  }

  protected async attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
    if (attributeName === "targetId" && newValue) {
      this.initEventDispatcher(newValue);
    }
  }

  // deconstruction
  protected disconnectedCallback() {
    super.disconnectedCallback();
    if (this.eventDispatcher) {
      this.eventDispatcher.off(
        TOGGLE_BUTTON.eventNames.toggled,
        this.onToggledEvent,
        this,
      );
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      console.warn(
        "[tw-toggle-button] No child elements found. Provide button content as children.",
      );
    }
    return null;
  }
}
