import { Utils as ExtraUtils } from './utils.service';
import { Gameloop } from './gameloop.service';

export interface AutoscrollOptions {
  angle?: 'vertical' | 'horizontal';
  direction?: 1 | -1;
  velocity?: number;
  width?: string;
  pauseOnHover?: boolean;
}

export class Autoscroll {

  protected direction = 1;

  protected limit: number;

  protected options: AutoscrollOptions;

  protected el: HTMLElement;

  protected pause = false;

  protected velocity = 0.008;

  protected move = 0;

  protected lastMove = 0;

  protected position: number;

  protected angle: 'horizontal' | 'vertical' = 'horizontal';

  protected pauseOnHover = true;

  protected resumeTimer: number | null = null;

  constructor(el: HTMLElement, options: AutoscrollOptions = {}) {
    this.el = el;
    this.options = options;
    this.direction = this.options.direction || this.direction;
    this.velocity = this.options.velocity || this.velocity;
    this.angle = this.options.angle || this.angle;
    this.pauseOnHover = typeof(this.options.pauseOnHover) === 'boolean' ? this.options.pauseOnHover : this.pauseOnHover;

    this.limit = this.getLimit(this.el);
    this.position = this.getPosition();

    window.addEventListener('resize', this.onResize.bind(this), {passive: true});

    if (this.direction === -1) {
      // start right
      this.el.scrollLeft = this.limit;
    } else {
      // start left
      this.el.scrollLeft = 0;
    }

    this.el.addEventListener('mouseenter', this.onMouseIn.bind(this), {passive: true});
    this.el.addEventListener('mouseover', this.onMouseIn.bind(this), {passive: true});
    this.el.addEventListener('focusin', this.onMouseIn.bind(this), {passive: true});
    this.el.addEventListener('touchstart', this.onMouseIn.bind(this), {passive: true});

    this.el.addEventListener('mouseout', this.onMouseOut.bind(this), {passive: true});
    this.el.addEventListener('mouseleave', this.onMouseOut.bind(this), {passive: true});
    this.el.addEventListener('focusout', this.onMouseOut.bind(this), {passive: true});

    this.el.addEventListener('mouseup', this.onMouseUp.bind(this), {passive: true});
    this.el.addEventListener('touchend', this.onMouseUp.bind(this), {passive: true});
    this.el.addEventListener('scroll', this.onMouseUp.bind(this), {passive: true});
    this.el.addEventListener('scrollend', this.onMouseUp.bind(this), {passive: true});
    // See ScrollEventsService for this event
    this.el.addEventListener('scrollended', this.onMouseUp.bind(this), {passive: true});

    Gameloop.startLoop({ maxFPS: 60 }, this.render.bind(this), this.update.bind(this));
  }

  public destroy() {
    this.removeEventListeners();
  }

  protected removeEventListeners() {
    window.removeEventListener('resize', this.onResize.bind(this));

    this.el.removeEventListener('mouseenter', this.onMouseIn.bind(this));
    this.el.removeEventListener('mouseover', this.onMouseIn.bind(this));
    this.el.removeEventListener('focusin', this.onMouseIn.bind(this));
    this.el.removeEventListener('touchstart', this.onMouseIn.bind(this));

    this.el.removeEventListener('mouseout', this.onMouseOut.bind(this));
    this.el.removeEventListener('mouseleave', this.onMouseOut.bind(this));
    this.el.removeEventListener('focusout', this.onMouseOut.bind(this));

    this.el.removeEventListener('mouseup', this.onMouseUp.bind(this));
    this.el.removeEventListener('touchend', this.onMouseUp.bind(this));
    this.el.removeEventListener('scroll', this.onMouseUp.bind(this));
    this.el.removeEventListener('scrollend', this.onMouseUp.bind(this));
    this.el.removeEventListener('scrollended', this.onMouseUp.bind(this));
  }

  protected onMouseIn() {
    if (this.pauseOnHover) {
      this.pause = true;
    }
  }

  protected onMouseOut() {
    this.resume(200);
  }

  protected onMouseUp() {
    this.resume(1000);
  }

  protected onResize() {
    this.limit = this.getLimit(this.el);
    this.pause = false;
  }

  /** Resume if this method was not called up for [delay] milliseconds */
  protected resume(delay = 1000) {
    if (!this.pause) {
      return;
    }

    if (this.resumeTimer !== null) {
      clearTimeout(this.resumeTimer);
      this.resumeTimer = null;
    }

    this.resumeTimer = window.setTimeout(() => {
      this.setPosition();
      this.pause = false;
    }, delay);
  }

  protected getPosition() {
    return (this.angle === 'vertical' ? this.el.scrollTop : this.el.scrollLeft) || 0;
  }

  protected setPosition() {
    this.position = this.getPosition();
  }

  protected getLimit(el: HTMLElement) {
    return this.angle === 'vertical' ? ExtraUtils.getScrollPosition(el).maxY : ExtraUtils.getScrollPosition(el).maxX;
  }

  protected render(interp: number) {
    if (this.pause) {
      return;
    }

    const move = (this.lastMove + (this.move - this.lastMove) * interp);
    this.move = 0;
    this.scroll(move);
  }

  protected update(delta: number) {
    // console.debug('delta', delta);
    if (this.pause) {
      return;
    }

    this.lastMove = this.move;
    this.move += (this.velocity * delta);

    // Switch directions if we go too far
    // `Math.floor()` rounds down, `Math.ceil()` rounds up, `Math.round()` rounds to the nearest integer
    if (Math.floor(this.position) <= 0 && this.direction !== 1) {
      this.direction = 1;
    }

    if (Math.ceil(this.position) >= this.limit && this.direction !== -1) {
      this.direction = -1;
    }
  }

  protected scroll(move: number) {
    const newPosition = this.direction > 0 ? this.position + move : this.position - move;
    if (this.angle === 'vertical') {
      this.el.scrollTop = Math.ceil(newPosition);
    } else {
      this.el.scrollLeft = Math.ceil(newPosition);
    }
    this.position = newPosition;
  }

}
