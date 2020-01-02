import { TemplatesComponent } from '../templates/templates.component';
import { Dragscroll, DragscrollOptions, Autoscroll, AutoscrollOptions, Utils as ExtraUtils, ScrollPosition, ScrollEventsService } from '@ribajs/extras';

import templateSlides from './bs4-slideshow-slides.component.html';

import templateControls from './bs4-slideshow-controls.component.html';

import templateIndicators from './bs4-slideshow-indicators.component.html';

const SLIDESHOW_INNER_SELECTOR = '.slideshow-inner';

const SLIDES_SELECTOR = `${SLIDESHOW_INNER_SELECTOR} > .slide`;

export interface Position extends DOMRect {
  centerX: number;
  centerY: number;
}

export interface Slide {
  title?: string;
  content: string;
  handle?: string;
  active: boolean;
  type?: string;
  position: Position;
  index: number;
}

export interface Options {
  slidesToScroll: number;
  controls: boolean;
  draggable: boolean;
  autoplay: boolean;
  /** Pause between autoscroll, 0 for continuously autoscrolling */
  autoplayInterval: number;
  autoplayVelocity: number;
  controlPrevIconSrc: string;
  controlNextIconSrc: string;
  indicatorInactiveIconSrc: string;
  indicatorActiveIconSrc: string;
  angle: 'vertical' | 'horizontal';
  pauseOnHover: boolean;
  /** Autoscroll to the nearest slide after manual scroll or dragscroll */
  sticky: boolean;
  /** Show indicators */
  indicators: boolean;
  /** Pause on autoplay (with interval) */
  pause: boolean;
}

export interface Scope extends Options {
  next: Bs4SlideshowComponent['next'];
  prev: Bs4SlideshowComponent['prev'];
  goTo: Bs4SlideshowComponent['goTo'];
  items: Slide[];
}

export class Bs4SlideshowComponent extends TemplatesComponent {

  protected get slideshowInner() {
    if (!this._slideshowInner) {
      this._slideshowInner = this.el.querySelector(SLIDESHOW_INNER_SELECTOR);
    }
    if (!this._slideshowInner) {
      throw new Error(`Child element with selecto ${SLIDESHOW_INNER_SELECTOR} not found!`);
    }
    return this._slideshowInner;
  }

  protected get slideElements() {
    if (!this._slideElements) {
      this._slideElements = this.el.querySelectorAll(SLIDES_SELECTOR);
    }
    if (!this._slideElements) {
      throw new Error(`Child element with selecto ${SLIDES_SELECTOR} not found!`);
    }
    return this._slideElements;
  }

  protected get controlsElements() {
    if (!this._controlsElements) {
      this._controlsElements = this.el.querySelectorAll('.slideshow-control-prev, .slideshow-control-next');
    }
    return this._controlsElements;
  }

  protected get indicatorsElement() {
    if (!this._indicatorsElement) {
      this._indicatorsElement = this.el.querySelector('.slideshow-indicators');
    }
    return this._indicatorsElement;
  }

  static get observedAttributes() {
    return [
      'slides-to-show',
      'slides-to-scroll',
      'controls',
      'draggable',
      'autoplay',
      'autoplay-interval',
      'autoplay-velocity',
      'control-prev-icon-src',
      'control-next-icon-src',
      'indicator-inactive-icon-src',
      'indicator-active-icon-src',
      'angle',
      'set-active-slide',
      'pause-on-hover',
      'sticky',
      'indicators',
      'pause',
    ];
  }

  public static tagName: string = 'bs4-slideshow';

  protected templateAttributes = [
    {
      name: 'class',
      required: false,
    },
    {
      name: 'handle',
      required: false,
    },
    {
      name: 'type',
      required: true,
    },
    {
      name: 'active',
      type: 'boolean',
      required: false,
    },
    {
      name: 'index',
      type: 'number',
      required: false,
    },
  ];

  protected autobind = true;

  protected dragscroll?: Dragscroll;

  protected autoscroll?: Autoscroll;

  protected scrollEvents?: ScrollEventsService;

  protected _slideshowInner: HTMLElement | null = null;

  protected _slideElements: NodeListOf<Element> | null = null;

  protected _controlsElements: NodeListOf<Element> | null = null;

  protected _indicatorsElement: HTMLElement | null = null;

  protected templateControls = templateControls;

  protected templateIndicators = templateIndicators;

  protected intervalAutoplayInterval: number | null = null;

  protected scope: Scope = {
    // Template methods
    next: this.next.bind(this),
    prev: this.prev.bind(this),
    goTo: this.goTo.bind(this),
    // Template properties
    items: new Array<Slide>(),
    // Options
    slidesToScroll: 1,
    controls: true,
    draggable: true,
    autoplay: false,
    autoplayInterval: 0,
    autoplayVelocity: 0.8,
    controlPrevIconSrc: '',
    controlNextIconSrc: '',
    indicatorActiveIconSrc: '',
    indicatorInactiveIconSrc: '',
    angle: 'horizontal',
    pauseOnHover: true,
    sticky: false,
    indicators: true,
    pause: false,
  };

  constructor(element?: HTMLElement) {
    super(element);
  }

  public next() {
    this.scrollToNextSlide();
  }

  public prev() {
    this.scrollToPrevSlide();
  }

  public goTo(index: number) {
    this.setSlidePositions();
    let top = 0;
    let left = 0;

    if (this.scope.angle === 'vertical') {
      // Check if we do not need to slide
      if (this.scope.items[index].position.centerY === 0) {
        // We do not need to scroll
        return;
      }
      top = this.slideshowInner.scrollTop + this.scope.items[index].position.centerY;
    } else {
      // Check if we do not need to slide
      if (this.scope.items[index].position.centerX === 0) {
        // We do not need to scroll
        return;
      }
      left = this.slideshowInner.scrollLeft + this.scope.items[index].position.centerX;
    }

    // TODO new scrollservice based on https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/
    if (this.slideElements[index]) {
      // if is is window to scroll
      if (typeof(this.slideshowInner.scroll) === 'function') {
        this.slideshowInner.scroll({
          behavior: 'smooth',
          left,
          top,
        });
      } else {
        if (this.scope.angle === 'vertical') {
          this.slideshowInner.scrollTop = top;
        } else {
          this.slideshowInner.scrollLeft = left;
        }
      }
    }
  }

  protected onResize() {
    this.onScrollend();
  }

  protected onScroll() {
    this.setSlidePositions();
    this.setCenteredSlide();
  }

  protected onScrollend(event?: Event) {
    this.setSlidePositions();
    this.setCenteredSlide();
    if (this.scope.sticky) {
      this.scrollToNearestSlide();
    }
  }

  protected onMouseIn() {
    if (this.scope.pauseOnHover) {
      this.scope.pause = true;
    }
  }

  protected onMouseOut() {
    this.scope.pause = false;
  }

  protected connectedCallback() {
    super.connectedCallback();
    return this.init(Bs4SlideshowComponent.observedAttributes);
  }

  protected addEventListeners() {
    this.el.addEventListener('resize', this.onResize.bind(this), false);
    // this.slideshowInner.addEventListener('scroll', this.onScroll.bind(this), { passive: true});
    this.slideshowInner.addEventListener('scrollEnd', this.onScrollend.bind(this), false);

    this.el.addEventListener('mouseenter', this.onMouseIn.bind(this));
    this.el.addEventListener('mouseover', this.onMouseIn.bind(this));
    this.el.addEventListener('mouseout', this.onMouseOut.bind(this));
    this.el.addEventListener('mouseleave', this.onMouseOut.bind(this));

    // inital
    this.onResize();
    // this.onScroll();
    this.onScrollend();
  }

  protected removeEventListeners() {
    this.el.removeEventListener('resize', this.onResize);
    this.slideshowInner.removeEventListener('scroll', this.onScroll);
    this.slideshowInner.removeEventListener('scrollEnd', this.onScrollend);

    this.el.removeEventListener('mouseenter', this.onMouseIn.bind(this));
    this.el.removeEventListener('mouseover', this.onMouseIn.bind(this));
    this.el.removeEventListener('mouseout', this.onMouseOut.bind(this));
    this.el.removeEventListener('mouseleave', this.onMouseOut.bind(this));
  }

  protected async beforeBind() {
    return super.beforeBind();
  }

  protected async afterBind() {
    await super.afterBind();

    this.initSlideshowInner();
    this.removeEventListeners();
    this.addEventListeners();
  }

  protected initSlideshowInner() {

    this.initSlideshowInnerSlides();
    if (!this.dragscroll && this.scope.draggable) {
      const dragscrollOptions: DragscrollOptions = {detectGlobalMove: true};
      this.dragscroll = new Dragscroll(this.slideshowInner, dragscrollOptions);
    }

    if (this.scope.autoplay) {
      this.initAutoplay();
    }

    this.scrollEvents = new ScrollEventsService(this.slideshowInner);
  }

  protected initContinuousAutoplay() {
    if (!this.autoscroll) {
      const autoscrollOptions: AutoscrollOptions = {
        velocity: this.scope.autoplayVelocity,
        angle: this.scope.angle,
        pauseOnHover: this.scope.pauseOnHover,
      };
      this.autoscroll = new Autoscroll(this.slideshowInner, autoscrollOptions);
    }
  }

  protected initIntervalAutoplay() {
    this.intervalAutoplayInterval = setInterval(() => {
      if (!this.scope.pause) {
        this.next();
      }
    }, this.scope.autoplayInterval);
  }

  protected initAutoplay() {
    // continuous scrolling
    if (this.scope.autoplayInterval <= 0) {
      this.initContinuousAutoplay();
    } else {
      this.initIntervalAutoplay();
    }
  }

  protected initSlideshowInnerSlides() {
    if (!this.slideElements) {
      throw new Error('No slides found!');
    }

    // If slides not added by template
    if (this.scope.items.length === 0) {
      this.addItemsByChilds();
    }

  }

  protected transformTemplateAttributes(attributes: any, index: number) {
    attributes.handle = attributes.handle || index.toString();
    attributes.index = index;
    attributes.class = attributes.class || '';
    attributes.class += ' slide';
    return attributes;
  }

  /**
   * Add slide by template element
   * @param tpl template element
   */
  protected addItemByTemplate(tpl: HTMLTemplateElement, index: number) {
    const attributes = this.getTemplateAttributes(tpl, index);
    const content = tpl.innerHTML;
    if (attributes.type) {
      if (attributes.type === 'slide') {
        this.scope.items.push({...attributes, content});
      }
      if (attributes.type === 'controls') {
        console.debug('Custom controls template', content);
        this.templateControls = content;
      }
      if (attributes.type === 'indicators') {
        console.debug('Custom indicators template', content);
        this.templateIndicators = content;
      }
    }
  }

  /**
   * Add slides by child elements (not as template elements)
   * @param tpl template element
   */
  protected addItemsByChilds() {
    if (!this.slideElements) {
      return;
    }
    this.slideElements.forEach((slideElement, index) => {
      const handle = slideElement.getAttribute('handle') || slideElement.getAttribute('id') || index.toString();
      slideElement.setAttribute('index', index.toString());
      const attributes = {
        handle,
        active: false,
        content: slideElement.innerHTML,
        index,
        position: {...slideElement.getBoundingClientRect(), centerY: 0, centerX: 0},
      };
      this.scope.items.push(attributes);
    });
  }

  protected getScrollPosition(): ScrollPosition {
    const scrollPosition = ExtraUtils.getScrollPosition(this.slideshowInner);
    return scrollPosition;
  }

  /**
   * get closest number
   * @see https://stackoverflow.com/a/35000557
   * @param goal the number which this number should be closest to
   * @param curr current number in loop
   * @param prev previous number or closest value found so far
   */
  protected getCurrentClosestNumber(goal: number, curr: number, prev: number) {
    return Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev;
  }

  protected getMostCenteredSlideIndex() {
    if (this.scope.items.length <= 0) {
      return -1;
    }
    let nearZero = Math.abs(this.scope.angle === 'vertical' ? this.scope.items[0].position.centerY : this.scope.items[0].position.centerX);
    let minIndex = 0;

    for (let i = 1; i < this.scope.items.length; i++) {
      const position = Math.abs(this.scope.angle === 'vertical' ? this.scope.items[i].position.centerY : this.scope.items[i].position.centerX);
      nearZero = this.getCurrentClosestNumber(0, position, nearZero);
      if (nearZero === position) {
        minIndex = i;
      }
    }
    return minIndex;
  }

  protected setAllSlidesUnactive(excludeIndex: number = -1) {
    if (!this.slideElements) {
      return;
    }
    for (let index = 0; index < this.scope.items.length; index++) {
      if (index !== excludeIndex) {
        if (this.scope.items[index]) {
          this.scope.items[index].active = false;
        }
        if (this.slideElements[index] && this.slideElements[index].classList.remove) {
          this.slideElements[index].classList.remove('active');
        }
      }
    }
  }

  protected setCenteredSlide() {
    const index = this.getMostCenteredSlideIndex();
    this.setAllSlidesUnactive(index);
    if (!this.scope.items[index]) {
      return;
    }
    this.scope.items[index].active = true;
    if (this.slideElements && this.slideElements[index].classList.add) {
      this.slideElements[index].classList.add('active');
    }
  }

  protected isScrollableToIndex(index: number) {
    if (!this.scope.items[index]) {
      return false;
    }
    const maxScrollTo = this.scope.angle === 'vertical' ? this.getScrollPosition().maxY : this.getScrollPosition().maxX;
    const scrollTo = this.scope.angle === 'vertical' ? this.slideshowInner.scrollTop + this.scope.items[index].position.centerY : this.slideshowInner.scrollLeft + this.scope.items[index].position.centerX;
    console.debug('scrollTo', scrollTo);
    console.debug('maxScrollTo', maxScrollTo);
    console.debug('scrollTo <= maxScrollTo && scrollTo >= 0', scrollTo <= maxScrollTo && scrollTo >= 0);
    return scrollTo <= maxScrollTo && scrollTo >= 0;
  }

  protected scrollToNextSlide() {
    this.setSlidePositions();
    const currentIndex = this.getMostCenteredSlideIndex();
    let nextIndex = currentIndex + this.scope.slidesToScroll;

    if (nextIndex >= this.slideElements.length) {
      nextIndex = nextIndex - this.slideElements.length;
    }

    // if (!this.isScrollableToIndex(nextIndex)) {
    //   nextIndex++;
    // }

    // if (nextIndex >= this.slideElements.length) {
    //   nextIndex = nextIndex - this.slideElements.length;
    // }

    return this.goTo(nextIndex);
  }

  protected scrollToPrevSlide() {
    this.setSlidePositions();
    const currentIndex = this.getMostCenteredSlideIndex();
    let prevIndex = currentIndex - this.scope.slidesToScroll;

    if (prevIndex < 0) {
      prevIndex = (this.slideElements.length - 1) - prevIndex;
    }

    // if (!this.isScrollableToIndex(prevIndex)) {
    //   prevIndex--;
    // }

    // if (prevIndex < 0) {
    //   prevIndex = (this.slideElements.length - 1) - prevIndex;
    // }

    return this.goTo(prevIndex);
  }

  protected scrollToNearestSlide() {
    this.setSlidePositions();
    const nearestIndex = this.getMostCenteredSlideIndex();
    return this.goTo(nearestIndex);
  }

  protected setSlidePositions() {
    if (this.scope.items.length !== this.slideElements?.length) {
      console.warn(`The slide objects must be the same size as the slide elements! ${this.scope.items.length} !== ${this.slideElements?.length}`);
      return;
    }
    const mainBoundingClient = this.slideshowInner.getBoundingClientRect();
    for (let i = 0; i < this.scope.items.length; i++) {
      const slideElement = this.slideElements[i];
      const slideObject = this.scope.items[i];
      const rect = slideElement.getBoundingClientRect();

      rect.x -= mainBoundingClient.x;
      rect.y -= mainBoundingClient.y;

      slideObject.position = {
        x: rect.x,
        y: rect.y,
        width: rect.width,
        height: rect.height,
        bottom: rect.bottom,
        left: rect.left,
        right: rect.right,
        top: rect.top,
        toJSON: rect.toJSON,
        // 0 if element is in the middle / center
        centerY: (rect.y + (rect.height / 2)) - mainBoundingClient.height / 2,
        // 0 if element is in the middle / center
        centerX: (rect.x + (rect.width / 2)) - mainBoundingClient.width / 2,
      };
    }
  }

  protected requiredAttributes() {
    return [];
  }

  protected parsedAttributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null) {
    return super.parsedAttributeChangedCallback(attributeName, oldValue, newValue, namespace);
  }

  // deconstructor
  protected disconnectedCallback() {
    this.removeEventListeners();
    this.scrollEvents?.removeEventListeners();
    if (this.intervalAutoplayInterval) {
      clearInterval(this.intervalAutoplayInterval);
    }
    return super.disconnectedCallback();
  }

  protected template() {
    // Only set the component template if there no childs or the childs are templates
    if (!this.el.hasChildNodes() || this.hasOnlyTemplateChilds()) {
      console.debug('Full template!', this.templateIndicators);
      return templateSlides + this.templateControls + this.templateIndicators;
    } else {
      console.debug('Append to template!');
      // Prepend control elements if no custom control elements in template are found
      if (this.scope.controls && this.controlsElements.length <= 0) {
        this.el.innerHTML += this.templateControls;
      }

      if (this.scope.indicators && !this.indicatorsElement) {
        this.el.innerHTML += this.templateIndicators;
      }

      return null;
    }
  }
}
