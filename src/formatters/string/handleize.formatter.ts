import { strip } from './strip.formatter';
import { downcase } from './downcase.formatter';

/**
 * Formats a string into a handle.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#handle-handleize
 */
export const handleize = (str: string) => {
  str = strip(str);
  str = str.replace(/[^\w\s]/gi, ''); // http://stackoverflow.com/a/4374890
  str = downcase(str);
  return str.replace(/ /g, '-');
};
