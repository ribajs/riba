import { IDebugger } from '../vendors';
import { Component, IRibaComponentContext } from './abstract-riba-component';
import { View } from '../view';
import { EventHandler } from '../interfaces';

/**
 * This class is just used in view.ts because types of `Component` can not have a `new` constuctor
 */
export declare class RibaComponent extends Component {
  public static tagName: string;

  public readonly bound: boolean;

  public context?: IRibaComponentContext;

  protected debug: IDebugger;
  protected view?: View;
  // protected _bound: boolean;

  protected templateLoaded: boolean;

  protected el: HTMLUnknownElement;

  protected scope: any;

  /**
   * If true the component will automatically bind the component to riba if all required attributes are setted
   */
  protected autobind: boolean;

  constructor(element?: HTMLUnknownElement, context?: IRibaComponentContext);

  public disconnectedFallbackCallback(): void;

  protected template(): Promise<string | null> | string | null;

  /**
   * returns a list of attributes wich are required until the riba binding starts
   */
  protected requiredAttributes(): string[];

  protected eventHandler(self: Component): EventHandler;

  /**
   * Default custom Element method
   * Invoked when the custom element is first connected to the document's DOM.
   */
  protected connectedCallback(): void;

  /**
   * Default custom Element method
   * Invoked when the custom element is disconnected from the document's DOM.
   */
  protected disconnectedCallback(): void;

  /**
   * Default custom Element method
   * Invoked when the custom element is moved to a new document.
   * @param attributeName
   * @param oldValue
   * @param newValue
   * @param namespace
   */
  protected attributeChangedCallback(attributeName: string, oldValue: any, newValue: any, namespace: string | null): void;

  /**
   * Default custom Element method
   * Invoked when one of the custom element's attributes is added, removed, or changed.
   * Note: Not supported on polyfill: https://github.com/webcomponents/custom-elements#known-bugs-and-limitations
   * @param oldDocument
   * @param newDocument
   */
  protected adoptedCallback(oldDocument: Document, newDocument: Document): void;

  protected bind(): Promise<View>;
}
