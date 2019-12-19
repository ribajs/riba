import { ScrollPosition } from '../types/scroll-position';

export class Utils {

  public static getScrollPosition(element: Element) {
    const scrollPosition: ScrollPosition = {
      x: element.scrollTop,
      y: element.scrollLeft,
      maxX: element.scrollHeight - element.clientHeight,
      maxY: element.scrollWidth - element.clientWidth,
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
