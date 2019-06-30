import { IModuleBinders } from '../interfaces';

import { animateStarBinder } from './animateStarStar.binder';
import { assignBinder } from './assign.binder';
import { classBinder } from './class.binder';
import { checkedBinder } from './checked.binder';
import { classStarBinder } from './class-star.binder';
import { cssStarBinder } from './css-star.binder';
import { enabledBinder } from './enabled.binder';
import { disabledBinder } from './disabled.binder';
import { onStarBinderWrapper } from './on-star.binder';
import { removeClassBinder } from './remove-class.binder';
import { ifBinder } from './if.binder';
import { eachStarBinder } from './each-star.binder';
import { htmlBinder } from './html.binder';
// This binder should not be used direcly.
// import { fallback } from './fallback.binder';
import { hideBinder } from './hide.binder';
import { showBinder } from './show.binder';
import { textBinder } from './text.binder';
import { valueBinder } from './value.binder';
import { starBinder } from './star.binder';

/**
 * Gets the basiic binders
 * @param jQuery Pass JQuery to basic binders to get JQuery support
 */
export const basicBindersWrapper = (jQuery: JQueryStatic) => {

  const binders: IModuleBinders<any> = {

    /**
     * animate-{class}
     * Add animation class with start and done affix
     */
    'animate-*': animateStarBinder,

    /**
     * Binds an event handler on the element.
     */
    'assign': assignBinder,

    /**
     * Binds an event handler on the element.
     */
    'on-*': onStarBinderWrapper(jQuery),

    /**
     * Appends bound instances of the element in place for each item in the array.
     */
    'each-*': eachStarBinder,

    /**
     * Adds the class from the element setted by the attribute value
     * (not by true or false like on the `class-*` binder).
     */
    'class': classBinder,

    /**
     * Removes the class from the element setted by the attribute value
     * (not by true or false like on the `class-*` binder).
     */
    'remove-class': removeClassBinder,

    /**
     * class-{classname}
     * Adds or removes the class from the element when value is true or false.
     */
    'class-*': classStarBinder,

    /**
     * class-{style attribute name}
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
    'text': textBinder,

    /**
     * Sets the element's HTML content.
     */
    'html': htmlBinder,

    /**
     * Shows the element when value is true.
     */
    'show': showBinder,

    // This binder should not be used direcly.
    // 'fallback': fallback,

    /**
     * Hides the element when value is true (negated version of `show` binder).
     */
    'hide': hideBinder,

    /**
     * Enables the element when value is true.
     */
    'enabled': enabledBinder,

    /**
     * Disables the element when value is true (negated version of `enabled` binder).
     */
    'disabled': disabledBinder,

    /**
     * Checks a checkbox or radio input when the value is true. Also sets the model
     * property when the input is checked or unchecked (two-way binder).
     */
    'checked': checkedBinder,

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
