import type { JsxHtmlGlobalProps } from "@ribajs/jsx/src/index.js";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface JsxBs5DropdownProps extends JsxHtmlGlobalProps {
  /**
   * Offset of the dropdown relative to its target. You can pass a string
   * in data attributes with comma separated values like:
   * data-bs-offset="10,20"
   *
   * When a function is used to determine the offset, it is called with an
   * object containing the popper placement, the reference, and popper
   * rects as its first argument. The triggering element DOM node is
   * passed as the second argument. The function must return an array with
   * two numbers: [skidding, distance].
   *
   * For more information refer to Popper's offset docs.
   *
   * @default [0, 2]
   */
  offset?: string;

  /**
  * Overflow constraint boundary of the dropdown menu. Accepts the values
  * of 'viewport', 'window', 'scrollParent', or an HTMLElement reference
  * (JavaScript only). For more information refer to Popper.js's
  * preventOverflow docs.
  *
  * @see {@link https://popper.js.org/docs/v2/modifiers/prevent-overflow/#boundary}
  * @default "scrollParent"
  */
  boundary?: string;

  /**
  * Reference element of the dropdown menu. Accepts the values of
  * 'toggle', 'parent', an HTMLElement reference or an object providing
  * getBoundingClientRect. For more information refer to Popper.js's
  * referenceObject docs.
  *
  * @see {@link https://popper.js.org/docs/v2/constructors/#createpopper}
  * @default "toggle"
  */
  reference?: 'toggle' | 'parent' | string;

  /**
  * By default, we use Popper.js for dynamic positioning. Disable this
  * with static.
  *
  * @default "dynamic"
  */
  display?: 'dynamic' | 'static';

  /**
  * To change Bootstrap's default Popper.js config, see Popper.js's
  * configuration
  *
  * When a function is used to create the Popper configuration, it's
  * called with an object that contains the Bootstrap's default Popper
  * configuration. It helps you use and merge the default with your own
  * configuration. The function must return a configuration object for
  * Popper.
  *
  * @see {@link https://popper.js.org/docs/v2}
  * @default null
  */
  'popper-config'?: string;

  /**
  * Configure the auto close behavior of the dropdown
  *
  * @default true
  */
  'auto-close'?: boolean | 'inside' | 'outside';
}
