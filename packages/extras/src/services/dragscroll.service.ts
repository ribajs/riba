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

    el.removeEventListener('mousedown', this.md.bind(this), false);
    el.addEventListener('mousedown', this.md.bind(this), false);

    window.addEventListener('resize', this.checkDraggable.bind(this));
    this.checkDraggable();

    // Use global move if your element does not use the full width / height
    if (this.options.detectGlobalMove) {
      window.removeEventListener('mouseup', this.mu.bind(this), false);
      window.removeEventListener('mousemove', this.mm.bind(this), false);

      window.addEventListener('mouseup', this.mu.bind(this), false);
      window.addEventListener('mousemove', this.mm.bind(this), false);
    } else {
      el.removeEventListener('mouseup', this.mu.bind(this), false);
      el.removeEventListener('mousemove', this.mm.bind(this), false);

      el.addEventListener('mouseup', this.mu.bind(this), false);
      el.addEventListener('mousemove', this.mm.bind(this), false);
    }
  }

  public removeEventListeners() {
    window.removeEventListener('resize', this.checkDraggable);
    this.el.removeEventListener('mousedown', this.md.bind(this), false);
    this.el.removeEventListener('mouseup', this.mu.bind(this), false);
    this.el.removeEventListener('mousemove', this.mm.bind(this), false);
  }

  protected checkDraggable() {
    const scrollPosition = Utils.getScrollPosition(this.el);
    if (scrollPosition.maxX > 0 || scrollPosition.maxY) {
      if (!this.el.classList.contains('draggable')) {
        this.el.classList.add('draggable');
      }
    } else {
      if (this.el.classList.contains('draggable')) {
        this.el.classList.remove('draggable');
      }
    }
  }

  protected md <EventListener>(e: MouseEvent) {
    this.pushed = true;
    this.lastClientX = e.clientX;
    this.lastClientY = e.clientY;
    if (this.options.preventDefault) {
      e.preventDefault();
    }
  }

  protected mu <EventListener>(e: MouseEvent) {
    this.pushed = false;
  }

  protected mm <EventListener>(e: MouseEvent) {
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
