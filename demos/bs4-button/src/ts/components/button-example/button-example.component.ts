import { Component, EventDispatcher } from "@ribajs/core";
import template from "./button-example.component.html";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";

export class ButtonExampleComponent extends Component {
  public static tagName = "rv-button-example";

  protected autobind = true;
  static get observedAttributes() {
    return [];
  }

  protected scope = {};

  protected eventDispatcher?: EventDispatcher;

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(ButtonExampleComponent.observedAttributes);

    this.eventDispatcher = EventDispatcher.getInstance("button-test");
    this.eventDispatcher.on("test-click", this.testClick);
    this.eventDispatcher.on("toggle", this.toggle);

    this.eventDispatcher = EventDispatcher.getInstance("another-namespace");
    this.eventDispatcher.on("open-url", this.openURL);

    //console.debug("ButtonExampleComponent scope", this.scope);
    
  }

  protected testClick() {
    console.log("test click");
  }

  protected toggle() {
    console.log("toggle sidehbar here");
  }

  protected openURL() {
    console.log("open url");
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this.el)) {
      // console.debug('Do not use template, because element has child nodes');
      return null;
    } else {
      // console.debug('Use template', template);
      return template;
    }
  }
}
