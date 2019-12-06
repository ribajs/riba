import jquery from 'jquery';

/**
 * JQuery Extension for mobile events: https://github.com/benmajor/jQuery-Touch-Events
 */
import touchEvents from './_jquery-touch-events';

// tslint:disable-next-line:variable-name
const JQuery: JQueryStatic = touchEvents(jquery);

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
