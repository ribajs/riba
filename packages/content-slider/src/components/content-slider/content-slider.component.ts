import { TemplatesComponent, TemplateFunction } from "@ribajs/core";
import { EventDispatcher } from "@ribajs/events";
import { debounce } from "@ribajs/utils/src/control";
import { hasChildNodesTrim } from "@ribajs/utils";
import { SlideItem } from "../../types";
import template from "./content-slider.component.html";

interface Scope {
  // States
  items: SlideItem[];
  /** Current / start index, by default 0. You can also change this attribute from outside to change the current active item */
  index: number;
  activeItem: SlideItem | null;
  transform: string;
  activeItemWidth: number;
  inactiveItemWidth: number;
  activeClass: string;

  // Options
  activeColumnClasses: string[];
  inactiveColumnClasses: string[];
  /** Show controls */
  controls: boolean;
  /** Icon source url for the prev slide icon button */
  controlPrevIconSrc: string;
  /** Icon source url for the next slide icon button */
  controlNextIconSrc: string;
  /** next or prev control button classes */
  controlsButtonClasses: string;

  // Methods
  prev: ContentSliderComponent["prev"];
  next: ContentSliderComponent["next"];
  goTo: ContentSliderComponent["goTo"];
}

export class ContentSliderComponent extends TemplatesComponent {
  public static tagName = "content-slider";

  protected autobind = true;

  protected templateAttributes = [
    {
      name: "image-src",
      required: true,
      type: "string",
    },
    {
      name: "active",
      required: false,
      type: "boolean",
    },
    {
      name: "index",
      required: false,
    },
    // Additional optional data
    {
      name: "data",
      required: false,
      type: "object",
    },
  ];

  static get observedAttributes(): string[] {
    return [
      "active-class",
      "active-column-classes",
      "inactive-column-classes",
      "index",
      "controls",
      "control-prev-icon-src",
      "control-next-icon-src",
      "controls-button-classes",
    ];
  }

  public events = EventDispatcher.getInstance(ContentSliderComponent.tagName);

  public scope: Scope = {
    // States
    items: [],
    index: 0,
    activeItem: null,
    transform: "translateX(0)",
    activeItemWidth: 0,
    inactiveItemWidth: 0,

    // Options
    activeClass: "active",
    activeColumnClasses: [
      "col-10",
      "col-sm-10",
      "col-md-6",
      "col-lg-5",
      "col-xl-4",
    ],
    inactiveColumnClasses: [
      "col-6",
      "col-sm-6",
      "col-md-2",
      "col-lg-2",
      "col-xl-2",
    ],
    controls: true,
    controlPrevIconSrc: "",
    controlNextIconSrc: "",
    controlsButtonClasses: "btn btn-outline-dark rounded-circle",

    // Methods
    prev: this.prev,
    next: this.next,
    goTo: this.goTo,
  };

  constructor() {
    super();
    this.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    return this.init(ContentSliderComponent.observedAttributes);
  }

  protected initItems() {
    const itemElements = this.querySelectorAll(".item");
    if (!itemElements || !itemElements.length) {
      throw new Error("No required items found!");
    }

    for (let i = 0; i < this.scope.items.length; i++) {
      const itemEl = itemElements[i];
      this.setInactiveClasses(itemEl);
    }

    this.goTo(this.scope.index);

    // WORKAROUND FIXME
    this.onResize();
    setTimeout(() => {
      this.onResize();
    }, 500);
  }

  protected onResize() {
    this.debug("onResize");
    this.getItemWidths();
    this.update();
  }

  protected initEventListeners() {
    this.onResize = debounce(this.onResize.bind(this));
    window.addEventListener("resize", this.onResize, { passive: true });
  }

  protected removeEventListeners() {
    window.removeEventListener("resize", this.onResize);
  }

  protected disconnectedCallback() {
    this.removeEventListeners();
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);

    const contentInfoOffsetEl = this.querySelector<HTMLElement>(".controls");
    if (contentInfoOffsetEl) {
      contentInfoOffsetEl.classList.add;
      this.addClasses(contentInfoOffsetEl, this.scope.activeColumnClasses);
    }

    this.initItems();
    this.initEventListeners();
    await super.afterBind();
  }

  protected async attributeChangedCallback(
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
    super.attributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );

    if (attributeName === "index") {
      this.goTo(this.scope.index);
    }
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected getItemElementByIndex(index: number) {
    return this.querySelectorAll(".item")?.item(index);
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
    let newActiveIndex = this.scope.index + 1;
    if (newActiveIndex > this.scope.items.length - 1) {
      newActiveIndex = 0;
    }
    this.goTo(newActiveIndex);
    this.events.trigger("next", newActiveIndex);
  }

  public prev() {
    let newActiveIndex = this.scope.index - 1;
    if (newActiveIndex < 0) {
      newActiveIndex = this.scope.items.length - 1;
    }
    this.goTo(newActiveIndex);
    this.events.trigger("prev", newActiveIndex);
  }

  public goTo(newActiveIndex: number) {
    this.debug("goTo");
    this.getItemWidths();
    const oldActiveItemEl = this.querySelector(`.${this.scope.activeClass}`);
    const newActiveItemEl = this.getItemElementByIndex(newActiveIndex);
    const item = this.scope.items[newActiveIndex];
    if (oldActiveItemEl) {
      this.setInactiveClasses(oldActiveItemEl);
    } else {
      this.debug("No old active item found!");
    }

    if (newActiveItemEl) {
      this.setActiveClasses(newActiveItemEl);
    } else {
      this.debug("No new active item found!");
    }

    this.setActiveItem(newActiveIndex);
    this.update();
    this.events.trigger("goTo", { oldActiveItemEl, newActiveItemEl, item });
  }

  protected setActiveItem(index: number) {
    if (this.scope.activeItem) {
      this.scope.activeItem.active = false;
    }
    this.scope.index = index;
    this.scope.activeItem = this.scope.items[this.scope.index] || null;
    if (this.scope.activeItem) {
      this.scope.activeItem.active = true;
    }
  }

  protected getItemWidths() {
    this.scope.activeItemWidth =
      this.querySelector(
        `.item.${this.scope.activeClass}`
      )?.getBoundingClientRect().width || 0;

    this.scope.inactiveItemWidth =
      this.querySelector(
        `.item:not(.${this.scope.activeClass})`
      )?.getBoundingClientRect().width || 0;

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
    this.debug("update", this.scope.index);

    const x = this.getTranslateXForIndex(this.scope.index);

    this.scope.transform = `translateX(-${x}px)`;
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs or the childs are templates
    if (!hasChildNodesTrim(this) || this.hasOnlyTemplateChilds()) {
      this.debug("Use template", template);
      return template;
    } else {
      this.debug("Don't use the template, because element has child nodes");
      return null;
    }
  }
}
