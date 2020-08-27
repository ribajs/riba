import { Component } from "@ribajs/core";

import template from "./content-slider.component.html";
import buttonsTemplate from "./content-slider-buttons.component.html";

interface Scope {
  hello?: string;
  currentElement: number;
  currentPosition: number;
  previous: ContentSliderComponent["previous"];
  next: ContentSliderComponent["next"];
  elementCount: number;
  currentContent: string;
  activeItemWidth: number;
  inactiveItemWidth: number;
  activeClass: string;
  activeColumnClasses: string[];
  inactiveColumnClasses: string[];
}

export class ContentSliderComponent extends Component {
  public static tagName = "content-slider";

  protected autobind = true;

  protected contentSliderEl: HTMLElement | null = null;

  static get observedAttributes() {
    return [];
  }

  protected scope: Scope = {
    hello: undefined,
    currentElement: 0,
    currentPosition: 0,
    previous: this.previous,
    next: this.next,
    elementCount: 0,
    currentContent: "",
    activeItemWidth: 0,
    inactiveItemWidth: 0,
    activeClass: "active",
    activeColumnClasses: ["col-8", "col-md-4"],
    inactiveColumnClasses: ["col-4", "col-md-2"],
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug("constructor", this);
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
    this.debug("beforeBind", this.scope);
  }

  protected initItems() {
    const items = this.el.querySelectorAll(".content-slider-item");
    if (!items) {
      throw new Error("No required items found!");
    }
    this.scope.elementCount = items.length;
    this.scope.currentElement = 0;

    for (let i = 0; i < this.scope.elementCount; i++) {
      const item = items[i];
      this.setInactiveClasses(item);
    }

    this.goTo(this.scope.currentElement);
  }

  protected async afterBind() {
    await super.afterBind();
    this.debug("afterBind", this.scope);
    this.contentSliderEl = this.el.querySelector<HTMLElement>(
      ".content-slider"
    );
    if (!this.contentSliderEl) {
      throw new Error("Missing element with selector .content-slider!");
    }

    const contentInfoOffsetEl = this.el.querySelector<HTMLElement>(
      ".content-slider-buttons"
    );
    if (contentInfoOffsetEl) {
      contentInfoOffsetEl.classList.add;
      this.addClasses(contentInfoOffsetEl, this.scope.activeColumnClasses);
    }

    this.initItems();
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

  protected getItemElementByIndex(index: number) {
    return this.el.querySelectorAll(".content-slider-item")?.item(index);
  }

  protected addClasses(el: Element, classes: string[]) {
    for (const curClass of classes) {
      el.classList.add(curClass);
    }
  }
  protected removeClasses(el: Element, classes: string[]) {
    for (const curClass of classes) {
      el.classList.remove(curClass);
    }
  }

  protected setInactiveClasses(el: Element) {
    this.removeClasses(el, [
      ...this.scope.activeColumnClasses,
      this.scope.activeClass,
    ]);

    this.addClasses(el, this.scope.inactiveColumnClasses);
  }

  protected setActiveClasses(el: Element) {
    this.removeClasses(el, this.scope.inactiveColumnClasses);

    this.addClasses(el, [
      ...this.scope.activeColumnClasses,
      this.scope.activeClass,
    ]);
  }

  public next() {
    const newActiveIndex = this.scope.currentElement + 1;
    this.goTo(newActiveIndex);
  }

  public previous() {
    const newActiveIndex = this.scope.currentElement - 1;
    this.goTo(newActiveIndex);
  }

  public goTo(newActiveIndex: number) {
    if (!this.el && this.el !== null) {
      console.error("Component is not ready!");
      return;
    }

    this.getItemWidths();

    const oldActiveItem = this.el.querySelector(".active");
    const newActiveItem = this.getItemElementByIndex(newActiveIndex);
    if (oldActiveItem) {
      this.setInactiveClasses(oldActiveItem);
    } else {
      console.warn("No old active item found!");
    }

    newActiveItem.classList.add("active");

    if (newActiveItem) {
      this.setActiveClasses(newActiveItem);
    } else {
      console.warn("No new active item found!");
    }

    this.scope.currentElement = newActiveIndex;
    console.log("previous", this.scope.currentElement);
    this.updateContent();
  }

  protected getItemWidths() {
    this.scope.activeItemWidth =
      this.el
        .querySelector(".content-slider-item.active")
        ?.getBoundingClientRect().width || 0;

    this.scope.inactiveItemWidth =
      this.el
        .querySelector(".content-slider-item:not(.active)")
        ?.getBoundingClientRect().width || 0;

    console.log("activeItemWidth", this.scope.activeItemWidth);
    console.log("inactiveItemWidth", this.scope.inactiveItemWidth);
  }

  protected getTranslateXForIndex(positionIndex: number) {
    this.scope.activeItemWidth =
      this.el
        .querySelector(".content-slider-item.active")
        ?.getBoundingClientRect().width || 0;

    this.scope.inactiveItemWidth =
      this.el
        .querySelector(".content-slider-item:not(.active)")
        ?.getBoundingClientRect().width || 0;

    if (positionIndex <= 0) {
      return 0;
    } else if (positionIndex === 1) {
      return this.scope.activeItemWidth;
    } else if (positionIndex > 1) {
      return (
        this.scope.activeItemWidth +
        this.scope.inactiveItemWidth * (positionIndex - 1)
      );
    }
    return 0;
  }

  public updateContent() {
    console.log(this.scope.currentElement);

    if (!this.contentSliderEl) {
      throw new Error("Missing element with selector .content-slider!");
    }

    // (this.el.querySelector(".content-slider") as HTMLElement).style.transform =
    //   "translateX(calc(calc(" +
    //   this.scope.currentElement +
    //   " * -20%) - calc(" +
    //   this.scope.currentElement +
    //   " * 20%)))";

    const x = this.getTranslateXForIndex(this.scope.currentElement);

    this.contentSliderEl.style.transform = `translateX(-${x}px)`;

    this.scope.currentContent = this.getItemElementByIndex(
      this.scope.currentElement
    ).children[0].innerHTML;
    //console.log("translateX(calc(calc(" + this.scope.currentElement + " * -20vw) - calc(" + this.scope.currentElement + " * 1vw))");
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      this.debug("Do not use template, because element has child nodes");
      return null;
    } else {
      this.debug("Use template", template);
      return template;
    }
  }
}
