import { Component, TemplateFunction } from "@ribajs/core/src/index.js";
import { Carousel } from "../../services/carousel";
import { CarouselOptions } from "../../types/index.js";

export interface Scope {
  // Properties
  interval: CarouselOptions["interval"];
  keyboard: CarouselOptions["keyboard"];
  pause: CarouselOptions["pause"];
  wrap: CarouselOptions["wrap"];
  touch: CarouselOptions["touch"];
  fade: boolean;
  // Methods
  next: Bs5CarouselComponent["next"];
  nextWhenVisible: Bs5CarouselComponent["nextWhenVisible"];
  prev: Bs5CarouselComponent["prev"];
  startPause: Bs5CarouselComponent["pause"];
  cycle: Bs5CarouselComponent["cycle"];
  to: Bs5CarouselComponent["to"];
  dispose: Bs5CarouselComponent["dispose"];
}

export class Bs5CarouselComponent extends Component {
  public static tagName = "bs5-carousel";

  static get observedAttributes(): string[] {
    return ["interval", "keyboard", "pause", "wrap", "touch", "fade"];
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  public scope: Scope = {
    // Properties
    interval: Carousel.Default.interval,
    keyboard: Carousel.Default.keyboard,
    pause: Carousel.Default.pause || false, // changed from pause to pause
    wrap: Carousel.Default.wrap,
    touch: Carousel.Default.touch,
    fade: false,
    // Methods
    next: this.next,
    nextWhenVisible: this.nextWhenVisible,
    prev: this.prev,
    startPause: this.pause,
    cycle: this.cycle,
    to: this.to,
    dispose: this.dispose
  };

  protected autobind = true;

  protected carouselService?: Carousel;

  constructor() {
    super();
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.classList.add("carousel", "slide");
  }

  protected async afterBind() {
    this.carouselService = new Carousel(this, {
      interval: this.scope.interval,
      keyboard: this.scope.keyboard,
      pause: this.scope.pause,
      wrap: this.scope.wrap,
      touch: this.scope.touch
    });
    if (this.scope.fade) {
      this.classList.add("carousel-fade");
    }
    // TODO make this configurable?
    this.carouselService.cycle();
    await super.afterBind();
  }

  public next() {
    if (this.carouselService) {
      this.carouselService.next();
    }
  }

  public nextWhenVisible() {
    if (this.carouselService) {
      this.carouselService.nextWhenVisible();
    }
  }

  public prev() {
    if (this.carouselService) {
      this.carouselService.prev();
    }
  }

  public pause() {
    if (this.carouselService) {
      this.carouselService.pause();
    }
  }

  public cycle() {
    if (this.carouselService) {
      this.carouselService.cycle();
    }
  }

  public to() {
    if (this.carouselService) {
      throw new Error("TODO");
      // this.carouselService.to(index);
    }
  }

  public dispose() {
    if (this.carouselService) {
      this.carouselService.dispose();
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(Bs5CarouselComponent.observedAttributes);
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
