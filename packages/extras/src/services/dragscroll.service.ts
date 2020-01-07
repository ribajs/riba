import { Utils } from './utils.service';

export interface DragscrollOptions {
  detectGlobalMove?: boolean;
}

/**
 * Scroll an scrollable element by draging and moving your mouse.
 * inspired by https://github.com/asvd/dragscroll
 */
export class Dragscroll {
  protected options: DragscrollOptions;
  protected lastClientX = 0;
  protected lastClientY = 0;
  protected el: HTMLElement;
  protected pushed = false;
  protected touchCapable = ('ontouchstart' in window);

  constructor(el: HTMLElement, options: DragscrollOptions = { detectGlobalMove: true }) {
    this.el = el;
    this.options = options;

    if (this.touchCapable) {
      // Do noting on touch devices
      return this;
    }

    el.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
    el.addEventListener('mousedown', this.onMouseDown.bind(this), {passive: true});

    window.addEventListener('resize', this.checkDraggable.bind(this));

    // Use global move if your element does not use the full width / height
    if (this.options.detectGlobalMove) {
      window.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
      window.removeEventListener('mousemove', this.onMouseMove.bind(this), false);

      window.addEventListener('mouseup', this.onMouseUp.bind(this), {passive: true});
      window.addEventListener('mousemove', this.onMouseMove.bind(this), {passive: true});
    } else {
      el.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
      el.removeEventListener('mousemove', this.onMouseMove.bind(this), false);

      el.addEventListener('mouseup', this.onMouseUp.bind(this), {passive: true});
      el.addEventListener('mousemove', this.onMouseMove.bind(this), {passive: true});
    }

    // initial
    this.checkDraggable();
  }

  public destroy() {
    this.removeEventListeners();
    this.el.classList.remove('draggable');
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
  }

  protected onMouseUp <EventListener>() {
    this.pushed = false;
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

  protected removeEventListeners() {
    window.removeEventListener('resize', this.checkDraggable);
    this.el.removeEventListener('mousedown', this.onMouseDown.bind(this), false);
    this.el.removeEventListener('mouseup', this.onMouseUp.bind(this), false);
    this.el.removeEventListener('mousemove', this.onMouseMove.bind(this), false);
  }

}
