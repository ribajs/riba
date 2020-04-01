import { Component } from "@ribajs/core";

import template from "./rv-photoswipe.component.html";
import fullscreenTemplate from "./rv-photoswipe.fullscreen.component.html";

import PhotoSwipe from "photoswipe";
import PhotoSwipeUI from "../../services/photoswipe-ui.service";
import { Options } from "../../types";

interface Scope {
  // Properties
  items: PhotoSwipe.Item[];
  isFullscreen: boolean;
  isZoomed: boolean;
  zoomLevel: number;

  // Methods
  open: PhotoswipeComponent["open"];
  openByIndex: PhotoswipeComponent["openByIndex"];
  close: PhotoswipeComponent["close"];
  next: PhotoswipeComponent["next"];
  prev: PhotoswipeComponent["prev"];
  toggleZoom: PhotoswipeComponent["openByIndex"];
  toggleFullscreen: PhotoswipeComponent["toggleFullscreen"];

  // Observed attributes
  openImageOnClick: boolean;
  fullscreenContainerSelector: string;
  itemsSelector: string;

  controlNextIconSrc: string;
  controlPrevIconSrc: string;
  controlCloseIconSrc: string;
  controlZoomInIconSrc: string;
  controlZoomOutIconSrc: string;
  controlFullscreenOnIconSrc: string;
  controlFullscreenOffIconSrc: string;
  controlShareIconSrc: string;
}

export class PhotoswipeComponent extends Component {
  public static tagName = "rv-photoswipe";

  protected autobind = true;

  protected pswp?: PhotoSwipe<any>;

  protected pswpElement: HTMLElement | null = null;

  protected images: HTMLImageElement[] = [];

  protected listeners = {
    items: [],
  };

  protected options: Options = {
    // optionName: 'option value'
    getThumbBoundsFn: this.getThumbBoundsFn.bind(this),

    // Buttons/elements
    closeEl: false,
    captionEl: false,
    fullscreenEl: false,
    zoomEl: false,
    shareEl: false,
    counterEl: false,
    arrowEl: false,
    preloaderEl: true,

    closeElClasses: [], // 'item', 'caption', 'zoom-wrap', 'ui', 'top-bar'
  };

  static get observedAttributes() {
    return [
      "open-image-on-click",
      "fullscreen-container-selector",
      "items-selector",
      // Icon sources
      "control-next-icon-src",
      "control-prev-icon-src",
      "control-close-icon-src",
      "control-zoom-in-icon-src",
      "control-zoom-out-icon-src",
      "control-fullscreen-on-icon-src",
      "control-fullscreen-off-icon-src",
      "control-share-icon-src",
    ];
  }

  protected scope: Scope = {
    // Properties
    items: [],
    isFullscreen: false,
    isZoomed: false,
    zoomLevel: 0,

    // Methods
    open: this.open,
    openByIndex: this.openByIndex,
    close: this.close,
    next: this.next,
    prev: this.prev,
    toggleZoom: this.toggleZoom,
    toggleFullscreen: this.toggleFullscreen,

    // Observed attribute default values
    openImageOnClick: false,
    fullscreenContainerSelector: ".pswp",
    itemsSelector: "img",

    controlNextIconSrc: "",
    controlPrevIconSrc: "",
    controlCloseIconSrc: "",
    controlZoomInIconSrc: "",
    controlZoomOutIconSrc: "",
    controlFullscreenOnIconSrc: "",
    controlFullscreenOffIconSrc: "",
    controlShareIconSrc: "",
  };

  constructor(element?: HTMLElement) {
    super(element);
    console.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(PhotoswipeComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes);
  }

  protected getThumbBoundsFn(index: number) {
    console.debug("[getThumbBoundsFn] index", index);
    if (!this.images) {
      return { x: 0, y: 0, w: 0 };
    }
    // find thumbnail element
    const image = this.images[index];
    console.debug("[getThumbBoundsFn] image", image);
    // get window scroll Y
    const pageYScroll =
      window.pageYOffset || document.documentElement.scrollTop;
    // optionally get horizontal scroll
    // get position of element relative to viewport
    const rect = image.getBoundingClientRect();
    return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
    // Good guide on how to get element coordinates:
    // http://javascript.info/tutorial/coordinates
  }

  protected async beforeBind() {
    console.debug("beforeBind", this.scope);
    return await super.beforeBind();
  }

  // Event handlers

  /**
   * Before slides change before the content is changed, but after navigation)
   * Update UI here (like "1 of X" indicator)
   */
  protected onBeforeChange() {
    console.debug("onBeforeChange", this.pswp?.currItem);
  }

  /**
   * After slides change
   * (after content changed)
   */
  protected onAfterChange() {
    console.debug("onAfterChange", this.pswp?.currItem);
  }

  /**
   * Image loaded
   * @param index index of a slide that was loaded
   * @param item slide object
   */
  protected onImageLoadComplete(index: number, item: PhotoSwipe.Item) {
    console.debug("imageLoadComplete", index, item);
  }

  /**
   * Viewport size changed
   */
  protected onResize() {
    console.debug("onResize", this.pswp?.currItem);
  }

  /**
   * Triggers when PhotoSwipe "reads" slide object data,
   * which happens before content is set, or before lazy-loading is initiated.
   * Use it to dynamically change properties
   * @param index index of a slide that was loaded
   * @param item slide object
   */
  protected onGettingData(index: number, item: PhotoSwipe.Item) {
    console.debug("onGettingData", index, item);
  }

  protected onMouseUsed() {
    console.debug("onMouseUsed");
  }

  protected onInitialZoomIn() {
    console.debug("onInitialZoomIn");
  }

  protected onInitialZoomInEnd() {
    console.debug("onInitialZoomInEnd");
  }

  protected onInitialZoomOut() {
    console.debug("onInitialZoomOut");
  }

  protected onInitialZoomOutEnd() {
    console.debug("onInitialZoomOutEnd");
  }

  protected onParseVerticalMargin() {
    console.debug("onParseVerticalMargin");
  }

  protected onUnbindEvents() {
    console.debug("onUnbindEvents");
  }

  protected onClose() {
    console.debug("onClose");
  }

  protected onDestroy() {
    console.debug("onDestroy");
  }

  protected onUpdateScrollOffset() {
    console.debug("onUpdateScrollOffset");
  }

  /**
   *
   * @param e original event
   * @param isDown true = drag start, false = drag release
   * @param preventObj
   */
  protected onPreventDragEvent(e: Event, isDown: boolean, preventObj: any) {
    console.debug("onPreventDragEvent", e, isDown, preventObj);
  }

  // Scope methods

  public openByIndex(index: number) {
    return this.open(this.scope.items[index]);
  }

  public close() {
    this.pswp?.close();
  }

  public next() {
    this.pswp?.next();
  }

  public prev() {
    this.pswp?.prev();
  }

  public share() {
    console.debug("share TODO");
  }

  public toggleZoom() {
    this.pswp?.toggleDesktopZoom();
    this.scope.zoomLevel = this.pswp?.getZoomLevel() || 1;
    this.scope.isZoomed = this.scope.zoomLevel < 1;
    console.debug("toggleZoom", this.scope.zoomLevel);
  }

  public toggleFullscreen() {
    const fullscrenAPI = ((this.pswp as any) || null)?.ui.getFullscreenAPI();
    if (fullscrenAPI.isFullscreen()) {
      fullscrenAPI.exit();
      this.scope.isFullscreen = false;
    } else {
      fullscrenAPI.enter();
      this.scope.isFullscreen = true;
    }
    (this.pswp?.ui as any).updateFullscreen();
  }

  public openWithoutAnimation(item: PhotoSwipe.Item) {
    const oldAnimationDuration = this.options.showAnimationDuration;
    this.options.showAnimationDuration = 0;
    this.open(item);
    if (oldAnimationDuration) {
      this.options.showAnimationDuration = oldAnimationDuration;
    } else {
      delete this.options.showAnimationDuration;
    }
  }

  public open(item: PhotoSwipe.Item) {
    console.debug("open", item, this.scope.items);
    if (!this.pswpElement) {
      console.error(
        `Element with selector "${this.scope.fullscreenContainerSelector}" not found`
      );
      return;
    }
    const index = this.scope.items.indexOf(item);
    if (index >= 0) {
      this.options.index = index;

      this.scope.isFullscreen = false;
      this.scope.isZoomed = false;

      this.pswp = new PhotoSwipe(
        this.pswpElement,
        PhotoSwipeUI,
        this.scope.items,
        this.options
      );
      this.addPswpEventListeners();
      this.pswp.init();

      //add listener
    } else {
      console.error("[rv-photoswipe] failed to get index of item ", item);
    }
  }

  protected addPswpEventListeners() {
    console.log("abc");
    // this.pswp?.listen('beforeChange', this.onBeforeChange.bind(this));
    // this.pswp?.listen('afterChange', this.onAfterChange.bind(this));
    // this.pswp?.listen('imageLoadComplete', this.onImageLoadComplete.bind(this));
    // this.pswp?.listen('resize', this.onResize.bind(this));
    // this.pswp?.listen('gettingData', this.onGettingData.bind(this));
    // this.pswp?.listen('mouseUsed', this.onMouseUsed.bind(this));
    // this.pswp?.listen('mouseUsed', this.onMouseUsed.bind(this));
    // this.pswp?.listen('initialZoomIn', this.onInitialZoomIn.bind(this));
    // this.pswp?.listen('initialZoomInEnd', this.onInitialZoomInEnd.bind(this));
    // this.pswp?.listen('initialZoomOut', this.onInitialZoomOut.bind(this));
    // this.pswp?.listen('initialZoomOutEnd', this.onInitialZoomOutEnd.bind(this));
    // this.pswp?.listen('parseVerticalMargin', this.onParseVerticalMargin.bind(this));
    // this.pswp?.listen('onUnbindEvents', this.onUnbindEvents.bind(this));
    this.pswp?.listen("close", this.onClose.bind(this));
    this.pswp?.listen("destroy", this.onDestroy.bind(this));
    // this.pswp?.listen('updateScrollOffset', this.onUpdateScrollOffset.bind(this));
  }

  protected removeEventListeners() {
    for (let i = 0; i < this.images.length; i++) {
      this.images[i].removeEventListener(
        "click",
        this.openByIndex.bind(this, i)
      );
    }
  }

  protected setItems() {
    this.images = Array.from(
      this.el.querySelectorAll(this.scope.itemsSelector)
    );

    for (let i = 0; i < this.images.length; i++) {
      console.log(this.images[i]);

      if (this.scope.openImageOnClick) {
        this.images[i].addEventListener(
          "click",
          this.openByIndex.bind(this, i)
        );
      }

      const src =
        this.images[i].dataset.fsSrc ||
        this.images[i].currentSrc ||
        this.images[i].src;
      const width =
        this.images[i].dataset.fsWidth ||
        this.images[i].naturalWidth ||
        this.images[i].width;
      const height =
        this.images[i].dataset.fsHeight ||
        this.images[i].naturalHeight ||
        this.images[i].height;
      if (!src || !width || !height) {
        console.warn(
          "[rv-photoswipe] image element found without src, width or height. Ignoring.."
        );
        continue;
      }

      this.scope.items.push({
        src: src,
        msrc: this.images[i].currentSrc || this.images[i].src || src,
        w: Number(width),
        h: Number(height),
      });
    }
  }

  protected initFullscreenTemplate() {
    this.pswpElement = this.el.querySelector<HTMLElement>(
      this.scope.fullscreenContainerSelector
    );
  }

  protected async afterBind() {
    console.debug("afterBind", this.scope);
    await super.afterBind();

    this.initFullscreenTemplate();

    this.setItems();

    const hashData = this.parseHash();
    if (hashData.pid && hashData.gid) {
      //Todo check for bounds
      this.openWithoutAnimation(this.scope.items[hashData.pid - 1]);
    }
  }

  protected parseHash() {
    const hash = window.location.hash.substring(1),
      params: { gid?: number; pid?: number } = {};

    if (hash.length < 5) {
      // pid=1
      return params;
    }

    const vars = hash.split("&");
    for (let i = 0; i < vars.length; i++) {
      if (!vars[i]) {
        continue;
      }
      const pair = vars[i].split("=");
      if (pair.length < 2) {
        continue;
      }
      params[pair[0] as "gid" | "pid"] = parseInt(pair[1], 10);
    }

    return params;
  }

  protected requiredAttributes() {
    return [];
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace
    );
  }

  // deconstructor
  protected disconnectedCallback() {
    super.disconnectedCallback();
    this.removeEventListeners();
  }

  protected template() {
    // Only set the component template if there no childs already<rv-photswipe>serhsehsehjiu </>
    if (this.el.hasChildNodes()) {
      // console.debug('Do not use template, because element has child nodes');
      return (this.el as HTMLElement).innerHTML + fullscreenTemplate;
    } else {
      // console.debug('Use template', template);
      return template + fullscreenTemplate;
    }
  }
}
