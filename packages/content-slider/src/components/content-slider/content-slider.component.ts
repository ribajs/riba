import { Component } from "@ribajs/core";
import { throttle } from "@ribajs/utils/src/control";

import template from "./content-slider.component.html";

interface Scope {
  currentIndex: number;
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
    return ["active-class", "active-column-classes", "inactive-column-classes"];
  }

  protected scope: Scope = {
    currentIndex: 0,
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

  protected initItems() {
    const items = this.el.querySelectorAll(".content-slider-item");
    if (!items) {
      throw new Error("No required items found!");
    }
    this.scope.elementCount = items.length;
    this.scope.currentIndex = 0;

    for (let i = 0; i < this.scope.elementCount; i++) {
      const item = items[i];
      this.setInactiveClasses(item);
    }

    this.goTo(this.scope.currentIndex);
  }

  protected onResize() {
    this.debug("onResize");
    this.getItemWidths();
    this.updateContent();
  }

  protected initEventListeners() {
    window.addEventListener(
      "resize",
      throttle(() => {
        this.onResize();
      })
    );
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
    this.initEventListeners();
  }

  protected attributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    //E.g. transform "col-2 col-md-4" to ["col-2", "col-md-4"]
    if (
      attributeName === "active-column-classes" ||
      attributeName === "inactive-column-classes"
    ) {
      if (newValue === "string") {
        newValue = newValue.split(" ");
      }
    }
    return super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  protected requiredAttributes() {
    return [];
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
    const newActiveIndex = this.scope.currentIndex + 1;
    this.goTo(newActiveIndex);
  }

  public previous() {
    const newActiveIndex = this.scope.currentIndex - 1;
    this.goTo(newActiveIndex);
  }

  public goTo(newActiveIndex: number) {
    if (!this.el && this.el !== null) {
      console.error("Component is not ready!");
      return;
    }

    this.debug("goTo");

    this.getItemWidths();

    const oldActiveItem = this.el.querySelector(".active");
    const newActiveItem = this.getItemElementByIndex(newActiveIndex);
    if (oldActiveItem) {
      this.setInactiveClasses(oldActiveItem);
    } else {
      console.warn("No old active item found!");
    }

    if (newActiveItem) {
      this.setActiveClasses(newActiveItem);
    } else {
      console.warn("No new active item found!");
    }

    this.scope.currentIndex = newActiveIndex;
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

    this.debug("getItemWidths activeItemWidth: ", this.scope.activeItemWidth);
    this.debug(
      "getItemWidths inactiveItemWidth: ",
      this.scope.inactiveItemWidth
    );
  }

  protected getTranslateXForIndex(positionIndex: number) {
    return this.scope.inactiveItemWidth * positionIndex;
  }

  public updateContent() {
    this.debug("updateContent", this.scope.currentIndex);

    if (!this.contentSliderEl) {
      throw new Error("Missing element with selector .content-slider!");
    }

    const x = this.getTranslateXForIndex(this.scope.currentIndex);

    this.contentSliderEl.style.transform = `translateX(-${x}px)`;

    this.scope.currentContent = this.getItemElementByIndex(
      this.scope.currentIndex
    ).children[0].innerHTML;
  }

  protected template() {
    // Only set the component template if there no childs already
    if (this.el.hasChildNodes()) {
      this.debug("Don't use the template, because element has child nodes");
      return null;
    } else {
      this.debug("Use template", template);
      return template;
    }
  }
}
