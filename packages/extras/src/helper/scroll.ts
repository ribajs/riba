import { ScrollPosition } from "../types/scroll-position";

export const getScrollPosition = (
  element: HTMLUnknownElement | Window
): ScrollPosition => {
  const window = element as Window;
  const el = element as HTMLUnknownElement;
  if (window.document && window.location) {
    const scrollPosition: ScrollPosition = {
      /** horizontal: left / right / width */
      x: window.pageXOffset,
      /** vertical: top / bottom / height */
      y: window.pageYOffset,
      /** horizontal: left / right / width */
      maxX:
        document.documentElement.scrollWidth -
        document.documentElement.clientWidth,
      /** vertical: top / bottom / height */
      maxY:
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight,
    };
    return scrollPosition;
  }
  const scrollPosition: ScrollPosition = {
    /** horizontal: left / right / width */
    x: el.scrollLeft,
    /** vertical: top / bottom / height */
    y: el.scrollTop,
    /** horizontal: left / right / width */
    maxX: el.scrollWidth - el.clientWidth,
    /** vertical: top / bottom / height */
    maxY: el.scrollHeight - el.clientHeight,
  };

  return scrollPosition;
};

export const isScrollable = (element: HTMLUnknownElement) => {
  const scrollPosition = getScrollPosition(element);
  return scrollPosition.maxX > 0 || scrollPosition.maxY > 0;
};
