import { IBinders } from '../../binder.service';

import { assign } from './assign.binder';
import { addClass } from './class.binder';
import { checked } from './checked.binder';
import { classStarJQuery } from './class-star.binder';
import { cssStarBinder } from './css-star.binder';
import { enabled } from './enabled.binder';
import { disabled } from './disabled.binder';
import { onStarBinderWrapper } from './on-star.binder';
import { removeClass } from './remove-class.binder';
import { ifBinder } from './if.binder';
import { eachStarBinder } from './each-star.binder';
import { html } from './html.binder';
import { hide } from './hide.binder';
import { show } from './show.binder';
import { text } from './text.binder';
import { valueBinder } from './value.binder';
import { starBinder } from './star.binder';

/**
 * Gets the basiic binders
 * @param jQuery Pass JQuery to basic binders to get JQuery support
 */
export const basicBindersWrapper = (jQuery: JQueryStatic) => {

  const binders: IBinders<any> = {

    /**
     * Binds an event handler on the element.
     */
    'assign': assign,

    /**
     * Binds an event handler on the element.
     */
    'on-*': onStarBinderWrapper(jQuery).binder,

    /**
     * Appends bound instances of the element in place for each item in the array.
     */
    'each-*': eachStarBinder,

    /**
     * Adds the class from the element setted by the attribute value
     * (not by true or false like on the `class-*` binder).
     */
    'class': addClass,

    /**
     * Removes the class from the element setted by the attribute value
     * (not by true or false like on the `class-*` binder).
     */
    'remove-class': removeClass,

    /**
     * Adds or removes the class from the element when value is true or false.
     */
    'class-*': classStarJQuery,

    /**
     * Adds a style to the element.
     *
     * ```html
     * <div rv-css-background-color="'blue'"></div>
     * ```
     * @see http://api.jquery.com/css/
     */
    'css-*': cssStarBinder,

    /**
     * Sets the element's text value.
     */
    'text': text,

    /**
     * Sets the element's HTML content.
     */
    'html': html,

    /**
     * Shows the element when value is true.
     */
    'show': show,

    /**
     * Hides the element when value is true (negated version of `show` binder).
     */
    'hide': hide,

    /**
     * Enables the element when value is true.
     */
    'enabled': enabled,

    /**
     * Disables the element when value is true (negated version of `enabled` binder).
     */
    'disabled': disabled,

    /**
     * Checks a checkbox or radio input when the value is true. Also sets the model
     * property when the input is checked or unchecked (two-way binder).
     */
    'checked': checked,

    /**
     * Sets the element's value. Also sets the model property when the input changes
     * (two-way binder).
     */
    'value': valueBinder,

    /**
     * Inserts and binds the element and it's child nodes into the DOM when true.
     */
    'if': ifBinder,

    /**
     * Sets the attribute on the element. If no binder above is matched it will fall
     * back to using this binder.
     */
    '*': starBinder,
  };
  return binders;
};
