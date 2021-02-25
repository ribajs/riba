import { Component } from "@ribajs/core";
import { CarouselService, Default } from "../../services/carousel.service";
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
  next: Bs5CarouselComponent["next"];
  nextWhenVisible: Bs5CarouselComponent["nextWhenVisible"];
  prev: Bs5CarouselComponent["prev"];
  pause: Bs5CarouselComponent["pause"];
  cycle: Bs5CarouselComponent["cycle"];
  to: Bs5CarouselComponent["to"];
  dispose: Bs5CarouselComponent["dispose"];
}

export class Bs5CarouselComponent extends Component {
  public static tagName = "bs5-carousel";

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
    interval: Default.interval,
    keyboard: Default.keyboard,
    slide: Default.slide,
    pauseOn: Default.pause || false, // changed from pause to pauseOn
    wrap: Default.wrap,
    touch: Default.touch,
    ride: Default.touch || false,
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

  constructor() {
    super();
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.classList.add("carousel", "slide");
  }

  protected async afterBind() {
    this.carouselService = new CarouselService(this, {
      interval: this.scope.interval,
      keyboard: this.scope.keyboard,
      slide: this.scope.slide,
      pause: this.scope.pauseOn,
      wrap: this.scope.wrap,
      touch: this.scope.touch,
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

  protected template() {
    return null;
  }
}
