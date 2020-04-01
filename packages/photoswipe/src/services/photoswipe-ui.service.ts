/* eslint-disable @typescript-eslint/camelcase */
/**
 * Ported TypeScrit version of https://raw.githubusercontent.com/dimsemenov/PhotoSwipe/master/src/js/ui/photoswipe-ui-default.js
 *
 *
 * UI on top of main sliding area (caption, arrows, close button, etc.).
 * Built just using public methods/properties of PhotoSwipe.
 */

import {
  Item,
  ShareButtonData,
  Options,
  UIElement,
  FullscreenApi,
} from "../types";
import * as PhotoSwipe from "photoswipe";

import { fullscreenApi } from "./fullscreen.service";

export class PhotoSwipeUI implements PhotoSwipe.UI<Options> {
  _overlayUIUpdated = false;
  _controlsVisible = true;
  _fullscrenAPI: FullscreenApi | null = null;
  _controls: any;
  _captionContainer: any;
  _fakeCaptionContainer: any;
  _indexIndicator: any;
  _shareButton: any;
  _shareModal: any;
  _shareModalHidden = true;
  _initalCloseOnScrollValue: any;
  _isIdle: any;
  _listen: PhotoSwipe<Options>["listen"];
  _loadingIndicator: any;
  _loadingIndicatorHidden = false;
  _loadingIndicatorTimeout: any;
  _galleryHasOneSlide: any;
  _options: Options = {};
  _defaultUIOptions = {
    barsSize: { top: 44, bottom: "auto" },
    closeElClasses: ["item", "caption", "zoom-wrap", "ui", "top-bar"],
    timeToIdle: 4000,
    timeToIdleOutside: 1000,
    loadingIndicatorDelay: 1000, // 2s

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

    closeEl: true,
    captionEl: true,
    fullscreenEl: true,
    zoomEl: true,
    shareEl: true,
    counterEl: true,
    arrowEl: true,
    preloaderEl: true,

    tapToClose: false,
    tapToToggleControls: true,

    clickToCloseNonZoomable: true,

    shareButtons: [
      {
        id: "facebook",
        label: "Share on Facebook",
        url: "https://www.facebook.com/sharer/sharer.php?u={{url}}",
      },
      {
        id: "twitter",
        label: "Tweet",
        url: "https://twitter.com/intent/tweet?text={{text}}&url={{url}}",
      },
      {
        id: "pinterest",
        label: "Pin it",
        url:
          "http://www.pinterest.com/pin/create/button/" +
          "?url={{url}}&media={{image_url}}&description={{text}}",
      },
      {
        id: "download",
        label: "Download image",
        url: "{{raw_image_url}}",
        download: true,
      },
    ] as ShareButtonData[],

    getImageURLForShare: (/* shareButtonData */) => {
      return this.pswp.currItem.src || "";
    },
    getPageURLForShare: (/* shareButtonData */) => {
      return window.location.href;
    },
    getTextForShare: (/* shareButtonData */) => {
      return (this.pswp.currItem as Item).title || "";
    },

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
      name: "share-modal",
      option: "shareEl",
      onInit: (el: HTMLElement) => {
        this._shareModal = el;
      },
      onTap: () => {
        this._toggleShareModal();
      },
    },
    {
      name: "button--share",
      option: "shareEl",
      onInit: (el: HTMLElement) => {
        this._shareButton = el;
      },
      onTap: () => {
        this._toggleShareModal();
      },
    },
    {
      name: "button--zoom",
      option: "zoomEl",
      onTap: () => {
        this.pswp.toggleDesktopZoom();
      },
    },
    {
      name: "counter",
      option: "counterEl",
      onInit: (el: HTMLElement) => {
        this._indexIndicator = el;
      },
    },
    {
      name: "button--close",
      option: "closeEl",
      onTap: () => {
        this.pswp.close();
      },
    },
    {
      name: "button--arrow--left",
      option: "arrowEl",
      onTap: () => {
        this.pswp.prev();
      },
    },
    {
      name: "button--arrow--right",
      option: "arrowEl",
      onTap: () => {
        this.pswp.next();
      },
    },
    {
      name: "button--fs",
      option: "fullscreenEl",
      onTap: () => {
        if (!this._fullscrenAPI) {
          throw new Error("_fullscrenAPI is undefined");
        }
        if (this._fullscrenAPI.isFullscreen()) {
          this._fullscrenAPI.exit();
        } else {
          this._fullscrenAPI.enter();
        }
      },
    },
    {
      name: "preloader",
      option: "preloaderEl",
      onInit: (el: HTMLElement) => {
        this._loadingIndicator = el;
      },
    },
  ] as UIElement[];

  constructor(
    protected readonly pswp: PhotoSwipe<Options>,
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

  protected _toggleShareModalClass() {
    this._togglePswpClass(
      this._shareModal,
      "share-modal--hidden",
      this._shareModalHidden
    );
  }

  protected _toggleShareModal() {
    this._shareModalHidden = !this._shareModalHidden;

    if (!this._shareModalHidden) {
      this._toggleShareModalClass();
      setTimeout(() => {
        if (!this._shareModalHidden) {
          this.framework.addClass(
            this._shareModal,
            "pswp__share-modal--fade-in"
          );
        }
      }, 30);
    } else {
      this.framework.removeClass(
        this._shareModal,
        "pswp__share-modal--fade-in"
      );
      setTimeout(() => {
        if (this._shareModalHidden) {
          this._toggleShareModalClass();
        }
      }, 300);
    }

    if (!this._shareModalHidden) {
      this._updateShareURLs();
    }
    return false;
  }

  protected _openWindowPopup(e: Event) {
    e = e || window.event;
    const target = (e.target || e.srcElement) as HTMLAnchorElement | null;

    this.pswp.shout("shareLinkClick", e, target);

    if (!target || !target.href) {
      return false;
    }

    if (target.hasAttribute("download")) {
      return true;
    }

    window.open(
      target.href,
      "pswp_share",
      "scrollbars=yes,resizable=yes,toolbar=no," +
        "location=yes,width=550,height=420,top=100,left=" +
        (window.screen ? Math.round(screen.width / 2 - 275) : 100)
    );

    if (!this._shareModalHidden) {
      this._toggleShareModal();
    }

    return false;
  }

  protected _updateShareURLs() {
    let shareButtonOut = "",
      shareButtonData: ShareButtonData,
      shareURL = "",
      image_url = "",
      page_url = "",
      share_text = "";

    if (!this._options.shareButtons) {
      return;
    }
    for (let i = 0; i < this._options.shareButtons.length; i++) {
      shareButtonData = this._options.shareButtons[i];

      if (this._options.getImageURLForShare) {
        image_url = this._options.getImageURLForShare(shareButtonData);
      }

      if (this._options.getPageURLForShare) {
        page_url = this._options.getPageURLForShare(shareButtonData);
      }

      if (this._options.getTextForShare) {
        share_text = this._options.getTextForShare(shareButtonData);
      }

      shareURL = shareButtonData.url
        .replace("{{url}}", encodeURIComponent(page_url))
        .replace("{{image_url}}", encodeURIComponent(image_url))
        .replace("{{raw_image_url}}", image_url)
        .replace("{{text}}", encodeURIComponent(share_text));

      shareButtonOut +=
        '<a href="' +
        shareURL +
        '" target="_blank" ' +
        'class="pswp__share--' +
        shareButtonData.id +
        '"' +
        (shareButtonData.download ? "download" : "") +
        ">" +
        shareButtonData.label +
        "</a>";

      if (this._options.parseShareButtonOut) {
        shareButtonOut = this._options.parseShareButtonOut(
          shareButtonData,
          shareButtonOut
        );
      }
    }
    this._shareModal.children[0].innerHTML = shareButtonOut;
    this._shareModal.children[0].onclick = this._openWindowPopup;
  }

  protected _hasCloseClass(target: HTMLElement) {
    if (!this._options.closeElClasses) {
      return false;
    }
    for (let i = 0; i < this._options.closeElClasses.length; i++) {
      if (
        this.framework.hasClass(
          target,
          "pswp__" + this._options.closeElClasses[i]
        )
      ) {
        return true;
      }
    }
    return false;
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
    if (this._options.fullscreenEl && !this.framework.features.isOldAndroid) {
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

  protected _setupLoadingIndicator() {
    // Setup loading indicator
    if (this._options.preloaderEl) {
      this._toggleLoadingIndicator(true);

      this._listen("beforeChange", () => {
        clearTimeout(this._loadingIndicatorTimeout);

        // display loading indicator with delay
        this._loadingIndicatorTimeout = setTimeout(() => {
          if (this.pswp.currItem && this.pswp.currItem.loading) {
            if (
              !this.pswp.allowProgressiveImg() ||
              (this.pswp.currItem.img && !this.pswp.currItem.img.naturalWidth)
            ) {
              // show preloader if progressive loading is not enabled,
              // or image width is not defined yet (because of slow connection)
              this._toggleLoadingIndicator(false);
              // items-controller.js function allowProgressiveImg
            }
          } else {
            this._toggleLoadingIndicator(true); // hide preloader
          }
        }, this._options.loadingIndicatorDelay);
      });
      this._listen("imageLoadComplete", (index: number, item: Item) => {
        if (this.pswp.currItem === item) {
          this._toggleLoadingIndicator(true);
        }
      });
    }
  }

  protected _toggleLoadingIndicator(hide: boolean) {
    if (this._loadingIndicatorHidden !== hide) {
      this._togglePswpClass(this._loadingIndicator, "preloader--active", !hide);
      this._loadingIndicatorHidden = hide;
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
    console.debug("_setupHidingControlsDuringGestures this", this);
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
              // if element is not disabled from options

              this.framework.removeClass(item, "pswp__element--disabled");
              if (uiElement.onInit) {
                uiElement.onInit(item);
              }

              //item.style.display = 'block';
            } else {
              this.framework.addClass(item, "pswp__element--disabled");
              //item.style.display = 'none';
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
    this._listen("doubleTap", (point) => {
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
    this._listen("preventDragEvent", (e, isDown, preventObj) => {
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
    });

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

      if (!this.pswp.likelyTouchDevice) {
        this.framework.bind(
          this.pswp.scrollWrap,
          "mouseover",
          this.onMouseOver.bind(this)
        );
      }
    });

    // unbind events for UI
    this._listen("unbindEvents", () => {
      if (!this._shareModalHidden) {
        this._toggleShareModal();
      }

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
      this.framework.unbind(
        this.pswp.scrollWrap,
        "mouseover",
        this.onMouseOver
      );

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

      if (this._shareModal) {
        this._shareModal.children[0].onclick = null;
      }
      this.framework.removeClass(this._controls, "pswp__ui--over-close");
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

    if (this._options.shareEl && this._shareButton && this._shareModal) {
      this._shareModalHidden = true;
    }

    this._countNumItems();

    this._setupIdle();

    this._setupFullscreenAPI();

    this._setupLoadingIndicator();
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

    if (!this._shareModalHidden) {
      this._toggleShareModal();
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
      // close gallery if clicked outside of the image
      if (this._hasCloseClass(target)) {
        this.pswp.close();
        return;
      }

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

      // tap to close gallery
      if (
        this._options.tapToClose &&
        target &&
        (this.framework.hasClass(target, "pswp__img") ||
          this._hasCloseClass(target))
      ) {
        this.pswp.close();
        return;
      }
    }
  }

  public onMouseOver(e: MouseEvent) {
    e = e || window.event;
    const target = (e?.target || e?.srcElement || null) as
      | (HTMLElement & EventTarget)
      | null;

    if (!target) {
      console.warn("Event target nt found!");
      return;
    }

    // add class when mouse is over an element that should close the gallery
    this._togglePswpClass(
      this._controls,
      "ui--over-close",
      this._hasCloseClass(target)
    );
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
    const d = document as Document & any;
    return !!(
      d.exitFullscreen ||
      d.mozCancelFullScreen ||
      d.webkitExitFullscreen ||
      d.msExitFullscreen
    );
  }

  public getFullscreenAPI(): FullscreenApi {
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
        return fullscreenApi.exit;
      },
      isFullscreen: fullscreenApi.isFullscreen,
    };
  }
}

export default PhotoSwipeUI;
