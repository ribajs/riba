/**
 * Custom common properties that may appear on any HTML element.
 */
export interface JsxHtmlCustomGlobalProps {
  /**
   * Bootstrap`s reboot style includes an enhancement for `role="button"` to change the default cursor to pointer.
   * Add this attribute to elements to help indicate elements are interactive.
   * This role isn’t necessary for `<button>` elements, which get their own cursor change.
   **/
  role?: "button" | string;
}
