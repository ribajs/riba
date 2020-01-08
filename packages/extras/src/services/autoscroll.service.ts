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

  protected touchCapable = ('ontouchstart' in window);

  protected direction = 1;

  protected limit: number;

  protected options: AutoscrollOptions;

  protected el: HTMLElement;

  protected _pause = false;

  protected velocity = 0.008;

  protected move = 0;

  protected lastMove = 0;

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
    this.move = this.getPosition();

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

    this.el.addEventListener('mouseleave', this.onMouseOut.bind(this), {passive: true});
    this.el.addEventListener('focusout', this.onMouseOut.bind(this), {passive: true});

    this.el.addEventListener('mouseup', this.onMouseUp.bind(this), {passive: true});
    this.el.addEventListener('touchend', this.onMouseUp.bind(this), {passive: true});
    
    if (this.touchCapable) {
      this.el.addEventListener('scroll', this.onMouseUp.bind(this), {passive: true});
      this.el.addEventListener('scrollend', this.onMouseUp.bind(this), {passive: true});
      // See ScrollEventsService for "scrollended" event
      this.el.addEventListener('scrollended', this.onMouseUp.bind(this), {passive: true});
    } else {
      this.el.addEventListener('scroll', this.onScroll.bind(this), {passive: true});
      this.el.addEventListener('scrollend', this.onScroll.bind(this), {passive: true});
      this.el.addEventListener('scrollended', this.onScroll.bind(this), {passive: true});
    }

    Gameloop.events.on('render', this.render.bind(this));
    Gameloop.events.on('update', this.updateMove.bind(this));

    Gameloop.startLoop({ maxFPS: 60 });
  }

  /**
   * @note this is not the gameloop update method!
   */
  public update() {
    this.limit = this.getLimit(this.el);
    this.setPosition();
  }

  public destroy() {
    this.removeEventListeners();
  }

  public pause() {
    this.el.style.scrollBehavior = '';
    this._pause = true;
  }

  /** Resume autoscrolling if this method was not called up for [delay] milliseconds */
  public resume(delay = 0) {
    if (!this._pause) {
      return;
    }

    this.stopResumeTimeout();

    this.resumeTimer = window.setTimeout(() => {
      this.setPosition();
      this._pause = false;
      // Disable smooth scrolling on autoscroll if set
      this.el.style.scrollBehavior = 'auto';
    }, delay);
  }

  protected removeEventListeners() {
    window.removeEventListener('resize', this.onResize.bind(this));

    this.el.removeEventListener('mouseenter', this.onMouseIn.bind(this));
    this.el.removeEventListener('mouseover', this.onMouseIn.bind(this));
    this.el.removeEventListener('focusin', this.onMouseIn.bind(this));
    this.el.removeEventListener('touchstart', this.onMouseIn.bind(this));

    this.el.removeEventListener('mouseleave', this.onMouseOut.bind(this));
    this.el.removeEventListener('focusout', this.onMouseOut.bind(this));

    this.el.removeEventListener('mouseup', this.onMouseUp.bind(this));
    this.el.removeEventListener('touchend', this.onMouseUp.bind(this));

    if (this.touchCapable) {
      this.el.removeEventListener('scroll', this.onMouseUp.bind(this));
      this.el.removeEventListener('scrollend', this.onMouseUp.bind(this));
      this.el.removeEventListener('scrollended', this.onMouseUp.bind(this));
    } else {
      this.el.removeEventListener('scroll', this.onScroll.bind(this));
      this.el.removeEventListener('scrollend', this.onScroll.bind(this));
      this.el.removeEventListener('scrollended', this.onScroll.bind(this));
    }

    Gameloop.events.off('render', this.render.bind(this));
    Gameloop.events.off('update', this.updateMove.bind(this));
  }

  protected onMouseIn() {
    if (this.pauseOnHover) {
      this.pause();
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
    this.resume(200);
  }

  protected onScroll() {
    this.stopResumeTimeout();
  }

  protected stopResumeTimeout() {
    if (this.resumeTimer !== null) {
      clearTimeout(this.resumeTimer);
      this.resumeTimer = null;
    }
  }

  protected getPosition() {
    return (this.angle === 'vertical' ? this.el.scrollTop : this.el.scrollLeft) || 0;
  }

  protected setPosition() {
    this.move = this.getPosition();
  }

  protected getLimit(el: HTMLElement) {
    return this.angle === 'vertical' ? ExtraUtils.getScrollPosition(el).maxY : ExtraUtils.getScrollPosition(el).maxX;
  }

  /**
   * This Interpolation:
   * ```
   * protected render(interp: number) {
   * ...
   * this.move = (this.lastMove + (this.move - this.lastMove) * interp);
   * ```
   * is not working here for some reasion
   * like it works in the demos/extras-game-loop demo or here:
   * https://isaacsukin.com/news/2015/01/detailed-explanation-javascript-game-loops-and-timing
   * 
   * Without this the scrollbar scrolls smooth, need to find out why.
   */
  protected render() {
    if (this._pause) {
      return;
    }

    this.scroll(this.move);
  }

  protected updateMove(delta: number) {
    if (this._pause) {
      return;
    }

    this.lastMove = this.move;
    const append = ((this.velocity * this.direction) * delta);
    this.move += append;

    // Switch directions if we go too far
    if (this.move <= 0 && this.direction !== 1) {
      this.direction = 1;
    }

    if (this.move >= this.limit && this.direction !== -1) {
      this.direction = -1;
    }
  }

  protected scroll(move: number) {
    if (this.angle === 'vertical') {
      this.el.scrollTop = move;
    } else {
      this.el.scrollLeft = move;
    }
  }

}
