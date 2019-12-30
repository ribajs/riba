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

  public static getScrollPosition(element: Element) {
    const scrollPosition: ScrollPosition = {
      /** horizontal: left / right / width */
      x: element.scrollTop,
      /** vertical: top / bottom / height */
      y: element.scrollLeft,
      /** horizontal: left / right / width */
      maxX: element.scrollWidth - element.clientWidth,
      /** vertical: top / bottom / height */
      maxY: element.scrollHeight - element.clientHeight,
    };

    return scrollPosition;
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
