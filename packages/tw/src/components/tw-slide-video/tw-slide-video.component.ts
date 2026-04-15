import { Component, TemplateFunction } from "@ribajs/core";
import { TwSlideshowComponent } from "../tw-slideshow/tw-slideshow.component.js";
import { TwSliderComponent } from "../tw-slider/tw-slider.component.js";
import template from "./tw-slide-video.component.html?raw";

interface Scope {
  /** Video source URL */
  src: string;
  /** Video MIME type (e.g. "video/mp4") */
  type: string;
  /** Set to true to play the video automatically when the slide is active */
  autoplayOnActive: boolean;
  /** Whether the video should be muted */
  muted: boolean;
  /** Whether the video should loop */
  loop: boolean;
  /** Whether to show native video controls */
  showControls: boolean;
}

/**
 * A video element that auto-plays when its parent slide becomes active.
 * Place inside a tw-slideshow or tw-slider slide.
 */
export class TwSlideVideoComponent extends Component {
  public static tagName = "tw-slide-video";

  public scope: Scope = {
    src: "",
    type: "video/mp4",
    autoplayOnActive: true,
    muted: true,
    loop: true,
    showControls: false,
  };

  protected slider: TwSliderComponent | TwSlideshowComponent | null = null;
  protected videoEl: HTMLVideoElement | null = null;
  protected slideEl: HTMLElement | null = null;

  static get observedAttributes(): string[] {
    return ["src", "type", "autoplay-on-active", "muted", "loop", "controls"];
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwSlideVideoComponent.observedAttributes);
    this.onSlideEnd = this.onSlideEnd.bind(this);
  }

  protected onSlideEnd() {
    this.debug("[TwSlideVideoComponent] onSlideEnd", this.slideEl?.classList);

    if (this.scope.autoplayOnActive) {
      this.playIfActive();
    }
  }

  protected playIfActive() {
    if (this.slideEl?.classList.contains("active")) {
      if (this.videoEl) {
        this.videoEl.play().catch((err) => {
          this.debug("Autoplay prevented:", err);
        });
      }
    } else {
      if (this.videoEl) {
        this.videoEl.pause();
      }
    }
  }

  protected async waitForUserInteraction(): Promise<string> {
    return new Promise((resolve) => {
      const removeEventListeners = () => {
        document.removeEventListener("click", clickHandler);
        document.removeEventListener("scroll", scrollHandler);
        document.removeEventListener("mousemove", mouseMoveHandler);
      };

      const clickHandler = () => {
        removeEventListeners();
        resolve("click");
      };

      const scrollHandler = () => {
        removeEventListeners();
        resolve("scroll");
      };

      const mouseMoveHandler = () => {
        removeEventListeners();
        resolve("mousemove");
      };

      document.addEventListener("click", clickHandler);
      document.addEventListener("scroll", scrollHandler);
      document.addEventListener("mousemove", mouseMoveHandler);
    });
  }

  protected addEventListeners() {
    this.slider?.addEventListener(
      "scrollended",
      this.onSlideEnd as EventListener,
    );
  }

  protected removeEventListeners() {
    this.slider?.removeEventListener(
      "scrollended",
      this.onSlideEnd as EventListener,
    );
  }

  protected async beforeBind(): Promise<void> {
    await super.beforeBind();
    this.addEventListeners();
  }

  protected async afterBind(): Promise<void> {
    this.videoEl = this.querySelector<HTMLVideoElement>("video");

    if (this.scope.autoplayOnActive) {
      if (this.slideEl?.classList.contains("active")) {
        await this.waitForUserInteraction();
        if (this.slideEl?.classList.contains("active")) {
          this.playIfActive();
        }
      }
    }
    await super.afterBind();
  }

  protected async beforeTemplate(): Promise<void> {
    this.slider =
      this.closest<TwSlideshowComponent>(TwSlideshowComponent.tagName) ||
      this.closest<TwSliderComponent>(TwSliderComponent.tagName);
    this.slideEl = this.closest<HTMLElement>(".slide");
  }

  protected requiredAttributes(): string[] {
    return ["src"];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );

    if (attributeName === "controls") {
      this.scope.showControls = !!newValue;
    }
  }

  protected disconnectedCallback() {
    this.removeEventListeners();
    super.disconnectedCallback();
  }

  protected template(): ReturnType<TemplateFunction> {
    // If the component already has children (e.g. a custom video element), skip the template
    if (this.hasChildNodes()) {
      const nonTemplateChildren = Array.from(this.childNodes).filter(
        (n) =>
          n.nodeType !== Node.COMMENT_NODE &&
          (n as Element).tagName !== "TEMPLATE",
      );
      if (nonTemplateChildren.length > 0) {
        return null;
      }
    }
    return template;
  }
}
