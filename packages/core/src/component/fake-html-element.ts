/**
 * This fake html element makes it possible to use custom elements with prototype classes for backward compatibility on old browsers
 */
class FakeHTMLElement /*implements HTMLElement*/ {
  // tslint:disable-next-line
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(element?: HTMLElement) {
    if (window.customElements && !(window as any).forceComponentFallback) {
      return Reflect.construct(HTMLElement as any, [], this.constructor);
    }
  }
}

if (window.customElements && !(window as any).forceComponentFallback) {
  try {
    FakeHTMLElement.prototype = Object.create(HTMLElement.prototype, {
      constructor: { value: HTMLElement, configurable: true, writable: true },
    });
  } catch (error) {
    console.error(error);
    // throw error;
  }

  Object.setPrototypeOf(FakeHTMLElement, HTMLElement);
}

export { FakeHTMLElement };
