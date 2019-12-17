import JQuery from 'jquery';

declare global {
  interface Window {
    $: JQueryStatic;
    jQuery: JQueryStatic;
  }
}

window.$ = JQuery;
window.jQuery = JQuery;

export default JQuery;
export { JQuery };
