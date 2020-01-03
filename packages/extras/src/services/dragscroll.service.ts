import { Utils } from './utils.service';

export interface DragscrollOptions {
  preventDefault?: boolean;
  detectGlobalMove?: boolean;
}

/**
 * Scroll an scrollable element by draging and moving your mouse.
 * inspired by https://github.com/asvd/dragscroll
 */
export class Dragscroll {
  private options: DragscrollOptions;
  private lastClientX = 0;
  private lastClientY = 0;
  private el: HTMLElement;
  private pushed: boolean = false;

  constructor(el: HTMLElement, options: DragscrollOptions = { detectGlobalMove: true, preventDefault: true }) {
    this.el = el;
    this.options = options;

    el.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
    el.addEventListener('mousedown', this.onMouseDown.bind(this), false);

    window.addEventListener('resize', this.checkDraggable.bind(this));

    // Use global move if your element does not use the full width / height
    if (this.options.detectGlobalMove) {
      window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
      window.removeEventListener('mousemove', this.onMouseMove.bind(this), false);

      window.addEventListener('mouseup', this.onMouseUp.bind(this), false);
      window.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    } else {
      el.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
      el.removeEventListener('mousemove', this.onMouseMove.bind(this), false);

      el.addEventListener('mouseup', this.onMouseUp.bind(this), false);
      el.addEventListener('mousemove', this.onMouseMove.bind(this), false);
    }

    // initial
    this.checkDraggable();
  }

  public removeEventListeners() {
    window.removeEventListener('resize', this.checkDraggable);
    this.el.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
    this.el.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
    this.el.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
  }

  public checkDraggable() {
    if (Utils.isScrollable(this.el)) {
      this.el.classList.add('draggable');
      return true;
    }
    this.el.classList.remove('draggable');
    return false;
  }

  protected onMouseDown <EventListener>(e: MouseEvent) {
    this.pushed = true;
    this.lastClientX = e.clientX;
    this.lastClientY = e.clientY;
    if (this.options.preventDefault) {
      e.preventDefault();
    }
  }

  protected onMouseUp <EventListener>(e: MouseEvent) {
    this.pushed = false;
    // this.triggerScrollendEvent(e);
  }

  protected onMouseMove <EventListener>(e: MouseEvent) {
    let newScrollX = 0;
    let newScrollY = 0;
    if (this.pushed) {
      this.el.scrollLeft -= newScrollX = (- this.lastClientX + (this.lastClientX = e.clientX));
      this.el.scrollTop -= newScrollY = (- this.lastClientY + (this.lastClientY = e.clientY));
      if (this.el === document.body) {
        if (document.documentElement) {
          this.el = document.documentElement;
        }
        this.el.scrollLeft -= newScrollX;
        this.el.scrollTop -= newScrollY;
      }
    }
  }
}
