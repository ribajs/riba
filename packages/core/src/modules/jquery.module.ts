import $ from 'jquery';

/**
 * JQuery Extension for mobile events: https://github.com/benmajor/jQuery-Touch-Events
 */
import touchEvents from './jquery-touch-events';

// tslint:disable-next-line:variable-name
const JQuery: JQueryStatic = touchEvents($);

export default JQuery;
export { JQuery };
