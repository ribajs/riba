/* eslint-disable @typescript-eslint/camelcase */
/**
 * Ported TypeScrit version of https://raw.githubusercontent.com/dimsemenov/PhotoSwipe/master/src/js/ui/photoswipe-ui-default.js
 *
 *
 * UI on top of main sliding area (caption, arrows, close button, etc.).
 * Built just using public methods/properties of PhotoSwipe.
 */

import { Item, Options, UIElement } from "../types";
import * as PhotoSwipe from "photoswipe";

import { FullscreenService } from "@ribajs/extras";

export class PhotoSwipeUI {
  _overlayUIUpdated = false;
  _controlsVisible = true;
  _fullscrenAPI: FullscreenService | null = null;
  _controls: any;
  _captionContainer: any;
  _fakeCaptionContainer: any;
  _indexIndicator: any;
  _shareButton?: HTMLElement;
  _shareModal?: HTMLElement;
  _shareModalHidden = true;
  _initalCloseOnScrollValue: any;
  _isIdle: any;
  _listen: PhotoSwipe<Options, PhotoSwipeUI>["listen"];
  _galleryHasOneSlide: any;
  _options: Options = {};
  _defaultUIOptions = {
    barsSize: { top: 44, bottom: "auto" },
    closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
    timeToIdle: 4000,
    timeToIdleOutside: 1000,

    addCaptionHTMLFn: function (
      item: Item,
      captionEl: HTMLElement
      /*isFake?: boolean*/
    ) {
      if (!item.title) {
        captionEl.children[0].innerHTML = "";
        return false;
      }
      captionEl.children[0].innerHTML = item.title;
      return true;
    },
    captionEl: true,
    counterEl: true,

    tapToClose: false,
    tapToToggleControls: true,

    clickToCloseNonZoomable: true,

    indexIndicatorSep: " / ",
    fitControlsWidth: 1200,
  } as Options;
  _blockControlsTap: any;
  _blockControlsTapTimeout: any;

  _idleInterval?: number;
  _idleTimer?: number;
  _idleIncrement = 0;

  _uiElements = [
    {
      name: "caption",
      option: "captionEl",
      onInit: (el: HTMLElement) => {
        this._captionContainer = el;
      },
    },
    {
      name: "counter",
      option: "counterEl",
      onInit: (el: HTMLElement) => {
        this._indexIndicator = el;
      },
    },
  ] as UIElement[];

  constructor(
    protected readonly pswp: PhotoSwipe<Options, PhotoSwipeUI>,
    protected readonly framework: PhotoSwipe.UIFramework
  ) {
    this.pswp = pswp;
    this.framework = framework;
    this._listen = this.pswp.listen;
  }

  protected _onControlsTap(e: Event) {
    if (this._blockControlsTap) {
      return true;
    }

    e = e || window.event;

    if (this._options.timeToIdle && this._options.mouseUsed && !this._isIdle) {
      // reset idle timer
      this._onIdleMouseMove();
    }

    const target = (e.target || e.srcElement) as HTMLElement | null;
    let uiElement;
    const clickedClass = target?.getAttribute("class") || "";
    let found;

    for (let i = 0; i < this._uiElements.length; i++) {
      uiElement = this._uiElements[i];
      if (
        uiElement.onTap &&
        clickedClass.indexOf("pswp__" + uiElement.name) > -1
      ) {
        uiElement.onTap();
        found = true;
      }
    }

    if (found) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      this._blockControlsTap = true;

      // Some versions of Android don't prevent ghost click event
      // when preventDefault() was called on touchstart and/or touchend.
      //
      // This happens on v4.3, 4.2, 4.1,
      // older versions strangely work correctly,
      // but just in case we add delay on all of them)
      const tapDelay = this.framework.features.isOldAndroid ? 600 : 30;
      this._blockControlsTapTimeout = setTimeout(() => {
        this._blockControlsTap = false;
      }, tapDelay);
    }
  }

  protected _fitControlsInViewport() {
    return (
      !this.pswp.likelyTouchDevice ||
      this._options.mouseUsed ||
      screen.width > (this._options.fitControlsWidth || 0)
    );
  }

  protected _togglePswpClass(el: HTMLElement, cName: string, add: boolean) {
    this.framework[(add ? "add" : "remove") + "Class"](el, "pswp__" + cName);
  }

  // add class when there is just one item in the gallery
  // (by default it hides left/right arrows and 1ofX counter)
  protected _countNumItems() {
    const hasOneSlide = !!(
      this._options.getNumItemsFn && this._options.getNumItemsFn() === 1
    );

    if (hasOneSlide !== this._galleryHasOneSlide) {
      this._togglePswpClass(this._controls, "ui--one-slide", hasOneSlide);
      this._galleryHasOneSlide = hasOneSlide;
    }
  }

  protected _onIdleMouseMove() {
    clearTimeout(this._idleTimer);
    this._idleIncrement = 0;
    if (this._isIdle) {
      this.setIdle(false);
    }
  }

  protected _onMouseLeaveWindow(e?: MouseEvent | Event) {
    e = e ? e : window.event;
    const from = (e as MouseEvent)?.relatedTarget || (e as any)?.toElement;
    if (!from || from.nodeName === "HTML") {
      clearTimeout(this._idleTimer);
      this._idleTimer = setTimeout(() => {
        this.setIdle(true);
      }, this._options.timeToIdleOutside);
    }
  }

  protected _setupFullscreenAPI() {
    if (!this.framework.features.isOldAndroid) {
      if (!this._fullscrenAPI) {
        this._fullscrenAPI = this.getFullscreenAPI();
      }
      if (this._fullscrenAPI) {
        this.framework.bind(
          document,
          this._fullscrenAPI.eventK,
          this.updateFullscreen
        );
        this.updateFullscreen();
        this.framework.addClass(this.pswp.template, "pswp--supports-fs");
      } else {
        this.framework.removeClass(this.pswp.template, "pswp--supports-fs");
      }
    }
  }

  protected _applyNavBarGaps(item: Item) {
    const gap = item.vGap;

    if (!gap) {
      throw new Error("gap is undefined");
    }

    if (this._fitControlsInViewport()) {
      const bars = this._options.barsSize;
      if (this._options.captionEl && bars && bars.bottom === "auto") {
        if (!this._fakeCaptionContainer) {
          this._fakeCaptionContainer = this.framework.createEl(
            "pswp__caption pswp__caption--fake"
          );
          this._fakeCaptionContainer.appendChild(
            this.framework.createEl("pswp__caption__center")
          );
          this._controls.insertBefore(
            this._fakeCaptionContainer,
            this._captionContainer
          );
          this.framework.addClass(this._controls, "pswp__ui--fit");
        }
        if (
          this._options &&
          this._options.addCaptionHTMLFn &&
          this._options.addCaptionHTMLFn(item, this._fakeCaptionContainer, true)
        ) {
          const captionSize = this._fakeCaptionContainer.clientHeight;
          gap.bottom = parseInt(captionSize, 10) || 44;
        } else {
          gap.bottom = bars.top; // if no caption, set size of bottom gap to size of top
        }
      } else {
        gap.bottom = (bars?.bottom === "auto" ? 0 : bars?.bottom) as number | 0;
      }

      // height of top bar is static, no need to calculate it
      gap.top = bars?.top || 0;
    } else {
      gap.top = gap.bottom = 0;
    }
  }

  protected _setupIdle() {
    // Hide controls when mouse is used
    if (this._options.timeToIdle) {
      this._listen("mouseUsed", () => {
        this.framework.bind(
          document,
          "mousemove",
          this._onIdleMouseMove.bind(this)
        );
        this.framework.bind(
          document,
          "mouseout",
          this._onMouseLeaveWindow.bind(this)
        );

        this._idleInterval = setInterval(() => {
          this._idleIncrement++;
          if (this._idleIncrement === 2) {
            this.setIdle(true);
          }
        }, (this._options.timeToIdle || 0) / 2);
      });
    }
  }

  protected _setupHidingControlsDuringGestures() {
    // Hide controls on vertical drag
    this._listen("onVerticalDrag", (now: number) => {
      if (this._controlsVisible && now < 0.95) {
        this.hideControls();
      } else if (!this._controlsVisible && now >= 0.95) {
        this.showControls();
      }
    });

    // Hide controls when pinching to close
    let pinchControlsHidden: boolean;
    this._listen("onPinchClose", (now: number) => {
      if (this._controlsVisible && now < 0.9) {
        this.hideControls();
        pinchControlsHidden = true;
      } else if (pinchControlsHidden && !this._controlsVisible && now > 0.9) {
        this.showControls();
      }
    });

    this._listen("zoomGestureEnded", () => {
      pinchControlsHidden = false;
      if (pinchControlsHidden && !this._controlsVisible) {
        this.showControls();
      }
    });
  }

  protected _setupUIElements() {
    let item, classAttr, uiElement;

    const loopThroughChildElements = (
      sChildren: NodeListOf<HTMLUnknownElement>
    ) => {
      if (!sChildren) {
        return;
      }

      const l = sChildren.length;
      for (let i = 0; i < l; i++) {
        item = sChildren[i];
        classAttr = item.className;

        for (let a = 0; a < this._uiElements.length; a++) {
          uiElement = this._uiElements[a];

          if (classAttr.indexOf("pswp__" + uiElement.name) > -1) {
            if (this._options[uiElement.option]) {
              if (typeof uiElement.onInit === "function") {
                uiElement.onInit(item);
              }
            }
          }
        }
      }
    };
    loopThroughChildElements(this._controls.children);

    const topBar = this.framework.getChildByClass(
      this._controls,
      "pswp__top-bar"
    );
    if (topBar) {
      loopThroughChildElements(topBar.children);
    }
  }

  public init() {
    // extend options
    this.framework.extend(this.pswp.options, this._defaultUIOptions, true);

    // create local link for fast access
    this._options = this.pswp.options;

    // find pswp__ui element
    this._controls = this.framework.getChildByClass(
      this.pswp.scrollWrap,
      "pswp__ui"
    );

    // create local link
    this._listen = this.pswp.listen;

    this._setupHidingControlsDuringGestures();

    // update controls when slides change
    this._listen("beforeChange", this.update.bind(this));

    // toggle zoom on double-tap
    this._listen("doubleTap", (point: MouseEvent) => {
      const initialZoomLevel = this.pswp.currItem.initialZoomLevel || 1;
      if (this.pswp.getZoomLevel() !== initialZoomLevel) {
        this.pswp.zoomTo(initialZoomLevel, point, 333);
      } else {
        const doubleTapZoom = this._options.getDoubleTapZoom
          ? this._options.getDoubleTapZoom(false, this.pswp.currItem)
          : 0;
        this.pswp.zoomTo(doubleTapZoom, point, 333);
      }
    });

    // Allow text selection in caption
    this._listen(
      "preventDragEvent",
      (
        e: MouseEvent,
        isDown: boolean,
        preventObj: {
          prevent: boolean;
        }
      ) => {
        const t = (e.target || e.srcElement) as
          | (EventTarget & HTMLElement)
          | null;
        if (
          t &&
          t.getAttribute("class") &&
          e.type.indexOf("mouse") > -1 &&
          (t.classList.contains("__caption") ||
            /(SMALL|STRONG|EM)/i.test(t.tagName))
        ) {
          preventObj.prevent = false;
        }
      }
    );

    // bind events for UI
    this._listen("bindEvents", () => {
      this.framework.bind(
        this._controls,
        "pswpTap click",
        this._onControlsTap.bind(this)
      );
      this.framework.bind(
        this.pswp.scrollWrap,
        "pswpTap",
        this.onGlobalTap.bind(this)
      );
    });

    // unbind events for UI
    this._listen("unbindEvents", () => {
      if (this._idleInterval) {
        clearInterval(this._idleInterval);
      }
      this.framework.unbind(document, "mouseout", this._onMouseLeaveWindow);
      this.framework.unbind(document, "mousemove", this._onIdleMouseMove);
      this.framework.unbind(
        this._controls,
        "pswpTap click",
        this._onControlsTap
      );
      this.framework.unbind(this.pswp.scrollWrap, "pswpTap", this.onGlobalTap);

      if (this._fullscrenAPI) {
        this.framework.unbind(
          document,
          this._fullscrenAPI.eventK,
          this.updateFullscreen
        );
        if (this._fullscrenAPI.isFullscreen()) {
          this._options.hideAnimationDuration = 0;
          this._fullscrenAPI.exit();
        }
        this._fullscrenAPI = null;
      }
    });

    // clean up things when gallery is destroyed
    this._listen("destroy", () => {
      if (this._options.captionEl) {
        if (this._fakeCaptionContainer) {
          this._controls.removeChild(this._fakeCaptionContainer);
        }
        this.framework.removeClass(
          this._captionContainer,
          "pswp__caption--empty"
        );
      }

      if (this._shareModal && this._shareModal.children[0]) {
        (this._shareModal.children[0] as HTMLElement).onclick = null;
      }
      this.framework.addClass(this._controls, "pswp__ui--hidden");
      this.setIdle(false);
    });

    if (!this._options.showAnimationDuration) {
      this.framework.removeClass(this._controls, "pswp__ui--hidden");
    }
    this._listen("initialZoomIn", () => {
      if (this._options.showAnimationDuration) {
        this.framework.removeClass(this._controls, "pswp__ui--hidden");
      }
    });
    this._listen("initialZoomOut", () => {
      this.framework.addClass(this._controls, "pswp__ui--hidden");
    });

    this._listen("parseVerticalMargin", this._applyNavBarGaps.bind(this));

    this._setupUIElements();

    this._countNumItems();

    this._setupIdle();

    this._setupFullscreenAPI();
  }

  public setIdle(isIdle: boolean) {
    this._isIdle = isIdle;
    this._togglePswpClass(this._controls, "ui--idle", isIdle);
  }

  public update() {
    // Don't update UI if it's hidden
    if (this._controlsVisible && this.pswp.currItem) {
      this.updateIndexIndicator();

      if (this._options.captionEl && this._options.addCaptionHTMLFn) {
        this._options.addCaptionHTMLFn(
          this.pswp.currItem,
          this._captionContainer
        );

        this._togglePswpClass(
          this._captionContainer,
          "caption--empty",
          !(this.pswp.currItem as Item).title
        );
      }

      this._overlayUIUpdated = true;
    } else {
      this._overlayUIUpdated = false;
    }

    this._countNumItems();
  }

  public updateFullscreen(e?: Event) {
    if (e) {
      // some browsers change window scroll position during the fullscreen
      // so PhotoSwipe updates it just in case
      setTimeout(() => {
        this.pswp.setScrollOffset(0, this.framework.getScrollY());
      }, 50);
    }

    // toogle pswp--fs class on root element
    this.framework[
      (this._fullscrenAPI?.isFullscreen() ? "add" : "remove") + "Class"
    ](this.pswp.template, "pswp--fs");
  }

  public updateIndexIndicator() {
    if (this._options.counterEl) {
      let numItems = 0;
      if (this._options.getNumItemsFn) {
        numItems = this._options.getNumItemsFn();
      }
      this._indexIndicator.innerHTML =
        this.pswp.getCurrentIndex() +
        1 +
        (this._options.indexIndicatorSep || "/") +
        numItems;
    }
  }

  public onGlobalTap(e?: Event | CustomEvent) {
    e = e || window.event;
    const target = (e?.target || e?.srcElement || null) as
      | (HTMLElement & EventTarget)
      | null;
    if (this._blockControlsTap) {
      return;
    }

    if (
      e &&
      (e as CustomEvent).detail &&
      (e as CustomEvent).detail.pointerType === "mouse" &&
      target
    ) {
      if (this.framework.hasClass(target, "pswp__img")) {
        if (
          this.pswp.getZoomLevel() === 1 &&
          this.pswp.getZoomLevel() <= (this.pswp.currItem.fitRatio || 0)
        ) {
          if (this._options.clickToCloseNonZoomable) {
            this.pswp.close();
          }
        } else {
          this.pswp.toggleDesktopZoom((e as CustomEvent).detail.releasePoint);
        }
      }
    } else {
      // tap anywhere (except buttons) to toggle visibility of controls
      if (this._options.tapToToggleControls) {
        if (this._controlsVisible) {
          this.hideControls();
        } else {
          this.showControls();
        }
      }
    }
  }

  public hideControls() {
    this.framework.addClass(this._controls, "pswp__ui--hidden");
    this._controlsVisible = false;
  }

  public showControls() {
    this._controlsVisible = true;
    if (!this._overlayUIUpdated) {
      this.update();
    }
    this.framework.removeClass(this._controls, "pswp__ui--hidden");
  }

  public supportsFullscreen() {
    return FullscreenService.supported();
  }

  public getFullscreenAPI(): FullscreenService {
    const fullscreenApi = FullscreenService.getSingleton();
    return {
      enterK: fullscreenApi.enterK,
      exitK: fullscreenApi.exitK,
      elementK: fullscreenApi.elementK,
      eventK: fullscreenApi.eventK,
      enter: () => {
        this._initalCloseOnScrollValue = this._options.closeOnScroll;
        this._options.closeOnScroll = false;
        return fullscreenApi.enter(this.pswp.template);
      },
      exit: () => {
        this._options.closeOnScroll = this._initalCloseOnScrollValue;
        return fullscreenApi.exit();
      },
      isFullscreen: fullscreenApi.isFullscreen,
      toggle: function (el: HTMLElement) {
        if (this.isFullscreen()) {
          this.exit();
          return;
        } else {
          this.enter(el);
        }
      },
    };
  }
}

export default PhotoSwipeUI;
