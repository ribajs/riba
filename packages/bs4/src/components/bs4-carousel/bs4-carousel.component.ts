import { Component } from "@ribajs/core";
import CarouselService from "../../services/carousel.service";
import { CarouselOption } from "../../interfaces";

export interface Scope {
  // Properties
  interval: CarouselOption["interval"];
  keyboard: CarouselOption["keyboard"];
  slide: CarouselOption["slide"];
  pauseOn: CarouselOption["pause"];
  wrap: CarouselOption["wrap"];
  touch: CarouselOption["touch"];
  ride: CarouselOption["ride"]; // TODO
  fade: boolean;
  // Methods
  next: Bs4CarouselComponent["next"];
  nextWhenVisible: Bs4CarouselComponent["nextWhenVisible"];
  prev: Bs4CarouselComponent["prev"];
  pause: Bs4CarouselComponent["pause"];
  cycle: Bs4CarouselComponent["cycle"];
  to: Bs4CarouselComponent["to"];
  dispose: Bs4CarouselComponent["dispose"];
}

export class Bs4CarouselComponent extends Component {
  public static tagName = "bs4-carousel";

  static get observedAttributes() {
    return [
      "interval",
      "keyboard",
      "slide",
      "pauseOn",
      "wrap",
      "touch",
      "ride",
      "fade",
    ];
  }

  protected requiredAttributes() {
    return [];
  }

  protected scope: Scope = {
    // Properties
    interval: CarouselService.Default.interval,
    keyboard: CarouselService.Default.keyboard,
    slide: CarouselService.Default.slide,
    pauseOn: CarouselService.Default.pause || false, // changed from pause to pauseOn
    wrap: CarouselService.Default.wrap,
    touch: CarouselService.Default.touch,
    ride: CarouselService.Default.touch || false,
    fade: false,
    // Methods
    next: this.next,
    nextWhenVisible: this.nextWhenVisible,
    prev: this.prev,
    pause: this.pause,
    cycle: this.cycle,
    to: this.to,
    dispose: this.dispose,
  };

  protected autobind = true;

  protected carouselService?: CarouselService;

  constructor(element?: HTMLElement) {
    super(element);
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.el.classList.add("carousel", "slide");
  }

  protected async afterBind() {
    await super.afterBind();
    this.carouselService = new CarouselService(this.el, {
      interval: this.scope.interval,
      keyboard: this.scope.keyboard,
      slide: this.scope.slide,
      pause: this.scope.pauseOn,
      wrap: this.scope.wrap,
      touch: this.scope.touch,
    });
    if (this.scope.fade) {
      this.el.classList.add("carousel-fade");
    }
    // TODO make this configurateable?
    this.carouselService.cycle();
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

  public cycle(event: Event) {
    if (this.carouselService) {
      this.carouselService.cycle(event);
    }
  }

  public to(index: number) {
    if (this.carouselService) {
      this.carouselService.to(index);
    }
  }

  public dispose() {
    if (this.carouselService) {
      this.carouselService.dispose();
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(Bs4CarouselComponent.observedAttributes);
  }

  protected template() {
    return null;
  }
}
