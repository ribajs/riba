import { strip } from './strip.formatter';
import { downcase } from './downcase.formatter';

/**
 * Formats a string into a handle.
 * @see https://help.shopify.com/themes/liquid/filters/string-filters#handle-handleize
 */
export const handleize = {
  name: 'handleize',
  read(str: string) {
    str = strip.read(str);
    str = str.replace(/[^\w\s]/gi, ''); // http://stackoverflow.com/a/4374890
    str = downcase.read(str);
    return str.replace(/ /g, '-');
  },
};
