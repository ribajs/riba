import { JsxChildren } from "./jsx-children.js";
import { JsxHtmlCustomGlobalProps } from "./jsx-html-custom-global-props";

/**
 * The common properties that may appear on any HTML element.
 *
 * Reference: https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes#list_of_global_attributes
 */
 export interface JsxHtmlGlobalProps extends JsxHtmlCustomGlobalProps {
  accessKey?: string;
  autocapitalize?: string;
  children?: JsxChildren;
  class?: string;
  contentEditable?: string;
  [data: `data-${string}`]: string;
  dir?: string;
  draggable?: boolean;
  enterKeyHint?: string;
  hidden?: boolean;
  id?: string;
  inputMode?: string;
  is?: string;

  // WHATWG HTML Microdata
  itemId?: string;
  itemProp?: string;
  itemRef?: string;
  itemScope?: string;
  itemType?: string;

  lang?: string;
  nonce?: string;
  part?: string;
  slot?: string;
  /** The spellcheck attribute specifies whether the element is to have its spelling and grammar checked or not. */
  spellcheck?: boolean;
  style?: string;
  tabIndex?: number;
  title?: string;
  translate?: boolean;
}
