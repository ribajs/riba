import JQuery from "jquery";

declare global {
  interface Window {
    $: JQueryStatic;
    jQuery: JQueryStatic;
  }
}

// Only set JQuery zp window if it is not already set
window.$ = window.$ || JQuery;
window.jQuery = window.jQuery || JQuery;

export { JQuery };
