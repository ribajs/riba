/**
 * This implementation of components replaces the old components of rivets following the Web Components v1 specs
 * using a [polyfill](https://github.com/webcomponents/webcomponentsjs) for browser they not support Web Components and to compile the components to ES5
 *
 * @see https://developer.mozilla.org/de/docs/Web/Web_Components/Using_custom_elements
 * @see https://github.com/webcomponents/webcomponentsjs
 * @see https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/webcomponents.js
 */
import 'webcomponents.js';
import Debug from 'debug';
import { View } from './view';
import { IViewOptions } from './tinybind';

export type RibaTemplateFunction = () => string | null;

export abstract class Component extends HTMLElement {

  protected debug: Debug.IDebugger;
  protected view: View;
  protected options: IViewOptions;

  constructor() {
    super();
    this.debug = Debug('webcomponents:' + this.constructor.name || 'RibaElement' );

    this.debug('constructor called');

    const template = this._template();
    // if innerHTML is null this component uses the innerHTML which he already has!
    if (template !== null) {
      this.innerHTML = template;
    }

    // Todo get the scope from
    const scope = {};

    /**
     * there's a cyclic dependency that makes imported View a dummy object. Use tinybind.bind
     */
    this.view = new View(Array.prototype.slice.call(this.childNodes), scope, this.options);
    this.view.bind();

  }

  set template(tplFn: RibaTemplateFunction) {
    this._template = tplFn;
  }

  /**
   * Default custom Element method
   * Invoked when the custom element is first connected to the document's DOM.
   */
  public connectedCallback() {
    this.debug('connectedCallback called');
  }

  /**
   * Default custom Element method
   * Invoked when the custom element is disconnected from the document's DOM.
   */
  public disconnectedCallback() {
    this.debug('disconnectedCallback called');
    this.view.unbind();
  }

  /**
   * Default custom Element method
   * Invoked when the custom element is moved to a new document.
   * @param attributeName
   * @param oldValue
   * @param newValue
   * @param namespace
   */
  public attributeChangedCallback(attributeName, oldValue, newValue, namespace) {
    this.debug('attributeChangedCallback called', attributeName, oldValue, newValue, namespace);
  }

  /**
   * Default custom Element method
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   * Note: Not supported on polyfill: https://github.com/webcomponents/custom-elements#known-bugs-and-limitations
   * @param oldDocument
   * @param newDocument
   */
  public adoptedCallback(oldDocument, newDocument) {
    this.debug('adoptedCallback called', oldDocument, newDocument);
  }

  /** If the template function returns null no template is injected */
  private _template: RibaTemplateFunction = () => {
    return null;
  }
}
