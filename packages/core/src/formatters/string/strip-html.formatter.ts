/* tslint:disable:variable-name */

/**
 * Strips all HTML tags from a string.
 * @see https://help.shopify.com/en/themes/liquid/filters/string-filters#strip_html
 */
export const stripHtmlFormatter = {
  name: 'stripHtml',
  read(html: string) {
    const tmp = document.createElement('DIV');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  },
};
