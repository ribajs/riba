import { TemplatesComponent } from '../templates/templates.component';
import { Dragscroll, DragscrollOptions, Autoscroll, AutoscrollOptions } from '@ribajs/extras';

import templateSlides from './bs4-slideshow-slides.component.html';

import templateControls from './bs4-slideshow-controls.component.html';

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
  slidesToShow: number;
  slidesToScroll: number;
  controls: boolean;
  draggable: boolean;
  autoscroll: boolean;
  autoscrollVelocity: number;
  controlPrevIconSrc: string;
  controlNextIconSrc: string;
}

// export type AttributeType = 'string' | 'number' | 'boolean';

// export interface TemplateAttribute {
//   name: string;
//   type?: AttributeType;
//   required?: boolean;
// }

// export type TemplateAttributes = Array<TemplateAttribute>;

export interface Scope extends Options {
  items: Slide[];
  next: Bs4SlideshowComponent['next'];
  prev: Bs4SlideshowComponent['prev'];
}

export class Bs4SlideshowComponent extends TemplatesComponent {

  public static tagName: string = 'bs4-slideshow';

  protected templateAttributes = [
    {
      name: 'class',
      required: true,
    },
    // {
    //   name: 'title',
    //   required: false,
    // },
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
      name: 'width',
      type: 'number',
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

  protected slideshowInner: HTMLElement | null = null;

  protected templateControls = templateControls;

  protected controlsElement: NodeListOf<Element> | null = null;

  static get observedAttributes() {
    return [
      'slides-to-show',
      'slides-to-scroll',
      'controls',
      'dragable',
      'autoscroll',
      'autoscroll-velocity',
      'control-prev-icon-src',
      'control-next-icon-src',
    ];
  }

  protected scope: Scope = {
    items: new Array<Slide>(),
    next: this.next,
    prev: this.prev,
    slidesToShow: 1,
    slidesToScroll: 1,
    controls: true,
    draggable: true,
    autoscroll: false,
    autoscrollVelocity: 0.8,
    controlPrevIconSrc: '',
    controlNextIconSrc: '',
  };

  constructor(element?: HTMLElement) {
    super(element);
    console.debug('constructor', this);
  }

  public next() {
    console.debug('next');
    // const scrollPosition = this.getScrollPosition();
    this.setSlidePositions();
  }

  public prev() {
    console.debug('prev');
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.el.addEventListener('resize', this.onResize.bind(this));
    return this.init(Bs4SlideshowComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes)
    .then((view) => {
      return view;
    });
  }

  protected onResize() {
    this.setSlidePositions();
  }

  // protected getScrollPosition(): ScrollPosition {
  //   if (!this.slideshowInner) {
  //     throw new Error('slideshowInner not found!');
  //   }
  //   const scrollPosition = ExtraUtils.getScrollPosition(this.slideshowInner);
  //   console.debug('scrollPosition', scrollPosition);
  //   return scrollPosition;
  // }

  protected async beforeBind() {
    return super.beforeBind()
    .then(() => {
      console.debug('beforeBind', this.scope);
      this.slideshowInner = this.el.querySelector('.slideshow-inner');
      this.addItemsByChilds();
    });
  }

  protected async afterBind() {
    return super.afterBind()
    .then(() => {
      // console.debug('afterBind', this.scope);
      if (!this.dragscroll && this.scope.draggable && this.slideshowInner) {
        const dragscrollOptions: DragscrollOptions = {};
        this.dragscroll = new Dragscroll(this.slideshowInner, dragscrollOptions);
      }
      if (!this.autoscroll && this.scope.autoscroll && this.slideshowInner) {
        const autoscrollOptions: AutoscrollOptions = {
          velocity: this.scope.autoscrollVelocity,
        };
        this.autoscroll = new Autoscroll(this.slideshowInner, autoscrollOptions);
      }
      this.slideshowInner = this.el.querySelector('.slideshow-inner');
      if (!this.slideshowInner) {
        throw new Error('An child element with the class "slideshow-inner" is requred!');
      }

      this.setSlidePositions();
    });
  }

  protected transformTemplateAttributes(attributes: any, index: number) {
    attributes.handle = attributes.handle || index.toString();
    attributes.index = index;
    return attributes;
  }

  /**
   * Add slide by template element
   * @param tpl template element
   */
  protected addItemByTemplate(tpl: HTMLTemplateElement, index: number) {
    const attributes = this.getTemplateAttributes(tpl, index);
    const content = tpl.innerHTML;
    if (attributes.type && attributes.type === 'slide') {
      this.scope.items.push({...attributes, content});
    }
    if (attributes.type && attributes.type === 'controls') {
      console.debug('Custom controls template');
      this.templateControls = content;
    }
  }

  /**
   * Add slides by child elements (not as template elements)
   * @param tpl template element
   */
  protected addItemsByChilds() {
    const slideElements = this.el.querySelectorAll('.slideshow-inner > [class^=\'col\']');
    slideElements.forEach((slideElement, index) => {
      const handle = slideElement.getAttribute('handle') || slideElement.getAttribute('id') || index.toString();
      slideElement.setAttribute('index', index.toString());
      const attributes = {
        handle,
        active: false,
        content: slideElement.innerHTML,
        index,
        position: {...slideElement.getBoundingClientRect(), centerY: 0, centerX: 0},
      };
      console.debug('slideElement', slideElement, attributes);
      this.scope.items.push(attributes);
    });
  }

  protected setSlidePositions() {
    const slideElements = this.el.querySelectorAll('.slideshow-inner > [class^=\'col\']');
    if (this.scope.items.length !== slideElements.length) {
      throw new Error('The slide objects must be the same size as the slide elements!');
    }
    if (!this.slideshowInner) {
      throw new Error('An child element with the class "slideshow-inner" is requred!');
    }
    const mainBoundingClient = this.slideshowInner.getBoundingClientRect();
    console.debug('boundingClient ', this.slideshowInner?.getBoundingClientRect());
    for (let i = 0; i < this.scope.items.length; i++) {
      const slideElement = slideElements[i];
      const slideObject = this.scope.items[i];
      const rect = slideElement.getBoundingClientRect();

      rect.x -= mainBoundingClient.x;
      rect.y -= mainBoundingClient.y;

      slideObject.position = {
        ...rect,
        // 0 if element is in the middle / center
        centerY: (rect.y + (rect.height / 2)) - mainBoundingClient.height / 2,
        // 0 if element is in the middle / center
        centerX: (rect.x + (rect.width / 2)) - mainBoundingClient.width / 2,
      };
      console.debug('position ' + slideObject.index, rect, slideObject.position);
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
    this.el.removeEventListener('resize', this.onResize.bind(this));
    return super.disconnectedCallback();
  }

  protected template() {
    // Only set the component template if there no childs or the childs are templates
    if (!this.el.hasChildNodes() || this.hasOnlyTemplateChilds()) {
      return templateSlides + this.templateControls;
    } else {
      if (this.scope.controls && !this.controlsElement) {
        this.el.innerHTML = this.templateControls + this.el.innerHTML;
        this.controlsElement = this.el.querySelectorAll('.slideshow-control-prev, .slideshow-control-next');
      }
      return null;
    }
  }
}
