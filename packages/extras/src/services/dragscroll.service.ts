export interface Options {
  preventDefault?: boolean;
  detectGlobalMove?: boolean;
}

/**
 * Scroll an scrollable element by draging and moving your mouse.
 * inspired by https://github.com/asvd/dragscroll
 */
export class Dragscroll {
  private options: Options;
  private lastClientX = 0;
  private lastClientY = 0;
  private el: HTMLElement;
  private pushed: boolean = false;

  constructor(el: HTMLElement, options: Options = { detectGlobalMove: true, preventDefault: true }) {
    this.el = el;
    this.options = options;

    el.removeEventListener('mousedown', this.md.bind(this), false);
    el.addEventListener('mousedown', this.md.bind(this), false);

    window.addEventListener('resize', this.checkDragable.bind(this));
    this.checkDragable();

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
    window.removeEventListener('resize', this.checkDragable);
    this.el.removeEventListener('mousedown', this.md.bind(this), false);
    this.el.removeEventListener('mouseup', this.mu.bind(this), false);
    this.el.removeEventListener('mousemove', this.mm.bind(this), false);
  }

  protected checkDragable() {
    const maxScrollTop = (this.el.scrollHeight || 0) - (this.el.offsetHeight || 0);
    // console.debug('checkDragable maxScrollTop', maxScrollTop);
    if (maxScrollTop > 0) {
      if (!this.el.classList.contains('dragable')) {
        this.el.classList.add('dragable');
      }
    } else {
      if (this.el.classList.contains('dragable')) {
        this.el.classList.remove('dragable');
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
