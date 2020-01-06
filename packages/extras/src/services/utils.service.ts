import { ScrollPosition } from '../types/scroll-position';

export class Utils {

  // easings methods, see https://pawelgrzybek.com/page-scroll-in-vanilla-javascript/

  public static linear(t: number) {
    return t;
  }
  public static easeInQuad(t: number) {
    return t * t;
  }
  public static easeOutQuad(t: number) {
    return t * (2 - t);
  }
  public static easeInOutQuad(t: number) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  }
  public static easeInCubic(t: number) {
    return t * t * t;
  }
  public static easeOutCubic(t: number) {
    return (--t) * t * t + 1;
  }
  public static easeInOutCubic(t: number) {
    return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
  }
  public static easeInQuart(t: number) {
    return t * t * t * t;
  }
  public static easeOutQuart(t: number) {
    return 1 - (--t) * t * t * t;
  }
  public static easeInOutQuart(t: number) {
    return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t;
  }
  public static easeInQuint(t: number) {
    return t * t * t * t * t;
  }
  public static easeOutQuint(t: number) {
    return 1 + (--t) * t * t * t * t;
  }
  public static easeInOutQuint(t: number) {
    return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * (--t) * t * t * t * t;
  }

  public static getScrollPosition(element: Element): ScrollPosition {
    // const rect = element.getBoundingClientRect();

    // const scrollWidth = element.scrollWidth;
    // const scrollWidthFallback = rect.left;

    // const x = element.scrollLeft;
    // const xFallback = Math.abs(rect.left);

    // const y = element.scrollTop;
    // const yFallback = Math.abs(rect.top);

    // console.debug('x', x);
    // console.debug('xFallback', xFallback);

    // console.debug('y', y);
    // console.debug('yFallback', yFallback);

    // console.debug('rect', rect);

    // const maxX = element.scrollHeight - element.clientHeight;
    // const maxXFallback = element.scrollHeight - element.clientHeight;

    // console.debug('maxX', maxX);
    // console.debug('maxXFallback', maxXFallback);


    const scrollPosition: ScrollPosition = {
      /** horizontal: left / right / width */
      x: element.scrollLeft,
      /** vertical: top / bottom / height */
      y: element.scrollTop,
      /** horizontal: left / right / width */
      maxX: element.scrollWidth - element.clientWidth,
      /** vertical: top / bottom / height */
      maxY: element.scrollHeight - element.clientHeight,
    };

    return scrollPosition;
  }

  public static isScrollable(element: Element) {
    const scrollPosition = this.getScrollPosition(element);
    console.debug('isScrollable', scrollPosition);
    return scrollPosition.maxX > 0 || scrollPosition.maxY > 0;
  }

  /**
   * Similar to JQuerys `$(el).index();`
   * @param el
   */
  public static getElementIndex(el: Element | null) {
    if (!el) {
      return -1;
    }
    let i = 0;
    do {
      i++;
      el = (el as HTMLElement).previousElementSibling;
    } while (el);
    return i;
  }
}
