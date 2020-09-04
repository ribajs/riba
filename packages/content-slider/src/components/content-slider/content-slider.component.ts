import { TemplatesComponent } from "@ribajs/core";
import { throttle } from "@ribajs/utils/src/control";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom";

import template from "./content-slider.component.html";

export interface SlideItem {
  /** Template content is the item capture */
  content: string;
  imageSrc: string;
  active: boolean;
  index: number;
}

interface Scope {
  items: SlideItem[];
  currentIndex: number;
  activeItem: SlideItem | null;
  transform: string;
  previous: ContentSliderComponent["previous"];
  next: ContentSliderComponent["next"];
  goTo: ContentSliderComponent["goTo"];
  activeItemWidth: number;
  inactiveItemWidth: number;
  activeClass: string;
  activeColumnClasses: string[];
  inactiveColumnClasses: string[];
}

export class ContentSliderComponent extends TemplatesComponent {
  public static tagName = "content-slider";

  protected autobind = true;

  protected templateAttributes = [
    {
      name: "image-src",
      required: true,
    },
    {
      name: "active",
      required: false,
    },
    {
      name: "index",
      required: false,
    },
  ];

  static get observedAttributes() {
    return ["active-class", "active-column-classes", "inactive-column-classes"];
  }

  protected scope: Scope = {
    items: [],
    currentIndex: 0,
    activeItem: null,
    transform: "translateX(0)",
    previous: this.previous,
    next: this.next,
    goTo: this.goTo,
    activeItemWidth: 0,
    inactiveItemWidth: 0,
    activeClass: "active",
    activeColumnClasses: [
      "col-10",
      "col-sm-8",
      "col-md-6",
      "col-lg-5",
      "col-xl-4",
    ],
    inactiveColumnClasses: [
      "col-6",
      "col-sm-5",
      "col-md-4",
      "col-lg-3",
      "col-xl-2",
    ],
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
    const items = this.el.querySelectorAll(".item");
    if (!items) {
      throw new Error("No required items found!");
    }

    this.setActiveItem(0);

    for (let i = 0; i < this.scope.items.length; i++) {
      const item = items[i];
      this.setInactiveClasses(item);
    }

    this.goTo(this.scope.currentIndex);
  }

  protected onResize() {
    throttle(() => {
      this.debug("onResize");
      this.getItemWidths();
      this.update();
    })();
  }

  protected initEventListeners() {
    window.addEventListener("resize", this.onResize.bind(this));
  }

  protected async afterBind() {
    await super.afterBind();
    this.debug("afterBind", this.scope);

    const contentInfoOffsetEl = this.el.querySelector<HTMLElement>(".controls");
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
      if (typeof newValue === "string") {
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
    return this.el.querySelectorAll(".item")?.item(index);
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

    this.setActiveItem(newActiveIndex);
    this.update();
  }

  protected setActiveItem(index: number) {
    if (this.scope.activeItem) {
      this.scope.activeItem.active = false;
    }
    this.scope.currentIndex = index;
    this.scope.activeItem = this.scope.items[this.scope.currentIndex];
    this.scope.activeItem.active = true;
  }

  protected getItemWidths() {
    this.scope.activeItemWidth =
      this.el
        .querySelector(`.item.${this.scope.activeClass}`)
        ?.getBoundingClientRect().width || 0;

    this.scope.inactiveItemWidth =
      this.el
        .querySelector(`.item:not(.${this.scope.activeClass})`)
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

  public update() {
    this.debug("update", this.scope.currentIndex);

    const x = this.getTranslateXForIndex(this.scope.currentIndex);

    this.scope.transform = `translateX(-${x}px)`;
  }

  protected template() {
    // Only set the component template if there no childs or the childs are templates
    if (!hasChildNodesTrim(this.el) || this.hasOnlyTemplateChilds()) {
      this.debug("Use template", template);
      return template;
    } else {
      this.debug("Don't use the template, because element has child nodes");
      return null;
    }
  }
}
