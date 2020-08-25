import { Component } from "@ribajs/core";

import template from "./content-slider.component.html";

interface Scope {
  hello?: string;
  currentElement: number;
  currentPosition: number;
  previous: ContentSliderComponent["previous"];
  next: ContentSliderComponent["next"];
  elementCount: number;
  currentContent?: string;
}

export class ContentSliderComponent extends Component {
  public static tagName = "content-slider";

  protected autobind = true;

  static get observedAttributes() {
    return ["hello"];
  }

  protected scope: Scope = {
    hello: undefined,
    currentElement: 0,
    currentPosition: 0,
    previous: this.previous,
    next: this.next,
    elementCount: 0,
    currentContent: undefined,
  };

  constructor(element?: HTMLElement) {
    super(element);
    console.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    return this.init(ContentSliderComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async beforeBind() {
    await super.beforeBind();
    console.debug("beforeBind", this.scope);
  }

  protected async afterBind() {
    await super.afterBind();
    console.debug("afterBind", this.scope);
    const children = this.el.querySelector(".content-slider")?.children;
    if (children) {
      this.scope.elementCount = children.length;
    }
    this.updateContent();
  }

  protected requiredAttributes() {
    return [];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    return super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  // deconstructor
  protected disconnectedCallback() {
    return super.disconnectedCallback();
  }

  public next() {
    if (!this.el && this.el !== null) {
      return;
    }

    this.el
      .querySelector(".vanilla_js_active")
      ?.classList.remove("vanilla_js_active");
    this.el
      .querySelector(".content-slider")
      ?.children[this.scope.currentElement + 1].classList.add(
        "vanilla_js_active"
      );
    this.scope.currentElement++;
    console.log("next", this.scope.currentElement);
    this.updateContent();
  }

  public previous() {
    if (!this.el && this.el !== null) {
      return;
    }

    this.el
      .querySelector(".vanilla_js_active")
      ?.classList.remove("vanilla_js_active");
    this.el
      .querySelector(".content-slider")
      ?.children[this.scope.currentElement - 1].classList.add(
        "vanilla_js_active"
      );
    this.scope.currentElement--;
    console.log("previous", this.scope.currentElement);git push
    console.log("check 1 2 3 ");
    this.updateContent();
  }

  public updateContent() {
    (this.el.querySelector(".content-slider") as HTMLElement).style.transform =
      "translateX(calc(calc(" +
      this.scope.currentElement +
      " * -20vw) - calc(" +
      this.scope.currentElement +
      " * 1vw))";

    this.scope.currentContent = this.el.querySelector(
      ".content-sliderls"
    )?.children[this.scope.currentElement].children[0].innerHTML;
    //console.log("translateX(calc(calc(" + this.scope.currentElement + " * -20vw) - calc(" + this.scope.currentElement + " * 1vw))");
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      console.debug("Do not use template, because element has child nodes");
      return null;
    } else {
      console.debug("Use template", template);
      return template;
    }
  }
}
