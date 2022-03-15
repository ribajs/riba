/**
 * see see https://github.com/twbs/bootstrap/blob/master/js/src/dom/event-handler.js
 */

export const on = (
  element: Element | HTMLElement | Document | Window,
  eventName: string,
  handler: EventListenerOrEventListenerObject
) => {
  return element.addEventListener(eventName as any, handler, {});
};

export const one = (
  element: Element | HTMLElement | Document | Window,
  eventName: string,
  handler: EventListenerOrEventListenerObject
) => {
  return element.addEventListener(eventName as any, handler, { once: true });
};

export const off = (
  element: Element | HTMLElement | Document | Window,
  originalTypeEvent: string,
  handler: EventListenerOrEventListenerObject
) => {
  return element.removeEventListener(originalTypeEvent as any, handler);
};

export const trigger = <T = any,>(
  element: Element | HTMLElement | Document | Window,
  eventName: string,
  extraParameters: any = {}
) => {
  const event = new CustomEvent<T>(eventName, {
    detail: extraParameters,
    bubbles: true,
    cancelable: true
  });
  element.dispatchEvent(event);
  return event;
};
