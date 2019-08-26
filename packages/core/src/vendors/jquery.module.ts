import jquery from 'jquery';

/**
 * JQuery Extension for mobile events: https://github.com/benmajor/jQuery-Touch-Events
 */
import touchEvents from './_jquery-touch-events';

// tslint:disable-next-line:variable-name
const JQuery: JQueryStatic = touchEvents(jquery);

export default JQuery;
export { JQuery };
