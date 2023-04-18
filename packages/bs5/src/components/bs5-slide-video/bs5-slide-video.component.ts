import { Component, TemplateFunction } from "@ribajs/core";
import { Bs5SliderComponent } from "../bs5-slider/bs5-slider.component.js";
import { VideoComponent } from "@ribajs/extras/src/components/index.js";

import type { ScrollEvent } from "@ribajs/extras";

interface Scope {
  /** Set to true to play the video automatically when the slide is active */
  autoplay: boolean;
}

/**
 * A slide with a video, used to play the video when the slide is active
 */
export class Bs5SlideVideoComponent extends Component {
  public static tagName = "bs5-slide-video";

  public scope: Scope = {
    autoplay: false,
  };

  slider: Bs5SliderComponent | null = null;
  videoCo: VideoComponent | null = null;
  videoEl: HTMLVideoElement | null = null;
  slideEl: HTMLElement | null = null;

  static get observedAttributes(): string[] {
    return ["autoplay"];
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5SlideVideoComponent.observedAttributes);
    this.onSlideEnd = this.onSlideEnd.bind(this);
  }

  protected onSlideEnd(event: ScrollEvent) {
    this.debug(
      "[Bs5SlideVideoComponent] onSlideEnd",
      event,
      this.slideEl?.classList
    );

    if (this.scope.autoplay) {
      this.playIfActive();
    }
  }

  protected playIfActive() {
    if (this.slideEl?.classList.contains("active")) {
      if (this.videoCo) {
        this.videoCo.play();
      } else if (this.videoEl) {
        this.videoEl.play();
      }
    }
  }

  protected addEventListeners() {
    this.slider?.addEventListener(
      Bs5SliderComponent.EVENTS.scrollended,
      this.onSlideEnd as EventListener
    );
  }

  protected removeEventListeners() {
    this.slider?.removeEventListener(
      Bs5SliderComponent.EVENTS.scrollended,
      this.onSlideEnd as EventListener
    );
  }

  protected async beforeBind(): Promise<void> {
    await super.beforeBind();
    this.addEventListeners();
  }

  protected async afterBind(): Promise<void> {
    if (this.scope.autoplay) {
      this.playIfActive();
    }
    await super.beforeBind();
  }

  protected async beforeTemplate(): Promise<void> {
    this.slider = this.closest<Bs5SliderComponent>(Bs5SliderComponent.tagName);
    this.videoCo = this.querySelector<VideoComponent>(VideoComponent.tagName);
    this.videoEl = this.querySelector<HTMLVideoElement>("video");
    this.slideEl = this.closest<HTMLElement>(".slide");
  }

  protected template(): ReturnType<TemplateFunction> {
    return null;
  }
}
