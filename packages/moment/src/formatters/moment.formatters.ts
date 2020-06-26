// Date formatters
// @see https://github.com/matthieuriolo/rivetsjs-stdlib/blob/master/src/rivetsstdlib.js

/* date s */

// export const date = (target, format) => {
//   return moment(target).format(format || 'DD.MM.YYYY');
// };

// export const time = (target, format) => {
//   return moment(target).format(format || 'HH:mm');
// };

// export const datetime = (target, format) => {
//   return moment(target).format(format);
// };

// export const toTimestamp = (target) => {
//   return moment(target).format('X');
// };

// export const toDate = (target) => {
//   return moment.unix(target).toDate();
// };

// export const toMoment = (target) => {
//   return moment(target);
// };

/**
 * Get the duration between two dates
 * @example  {startAt | duration endAt | asHours }
 */
// export const duration = (start, end) => {
//   return moment.duration(moment(end).diff(start));
// };

// export const asHours = (date) => {
//   return date.asHours();
// };

/**
 * The date formatter returns a formatted date string according to the moment.js
 * formatting syntax.
 *
 * ```html
 * <span rv-value="model:date | date 'dddd, MMMM Do'"></span>
 * ```
 *
 * @see {@link http://momentjs.com/docs/#/displaying} for format options.
 */
// export const dateFormat = (target, val) => {
//   return moment(target).format(val);
// };
