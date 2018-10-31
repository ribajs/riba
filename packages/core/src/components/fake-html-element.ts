class FakeHTMLElement /*implements HTMLElement*/ {
  constructor(element?: HTMLElement) {
    if (window.customElements) {
      return Reflect.construct(HTMLElement, [], this.constructor);
    }
  }
}

if (window.customElements) {
  FakeHTMLElement.prototype = Object.create(HTMLElement.prototype, {
    constructor: {value: HTMLElement, configurable: true, writable: true},
  });
  Object.setPrototypeOf(FakeHTMLElement, HTMLElement);
}

export { FakeHTMLElement };
