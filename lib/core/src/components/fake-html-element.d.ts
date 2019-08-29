/**
 * This fake html element makes it possible to use custom elements with prodotype classes for backward compatibility on old browsers
 */
declare class FakeHTMLElement {
    constructor(element?: HTMLElement);
}
export { FakeHTMLElement };
