import { Debug } from '@ribajs/core';
/**
 * Object that is going to deal with DOM parsing/manipulation
 */
class Dom {
  /**
   * The name of the data attribute on the container
   */
  public dataNamespace = 'namespace';

  /**
   * Class name used to identify the containers
   *
   * @default
   */
  public containerSelector: string;

  /**
   * Full HTML String of the current page.
   * By default is the innerHTML of the initial loaded page.
   *
   * Each time a new page is loaded, the value is the response of the xhr call.
   *
   */
  public currentHTML?: string;

  private _wrapper: HTMLElement;

  private parseTitle: boolean;

  private debug = Debug('router:Dom');

  constructor(wrapper: HTMLElement, containerSelector = '[data-namespace]', parseTitle: boolean) {
    this._wrapper = wrapper;
    this.containerSelector = containerSelector;
    this.parseTitle = parseTitle;
  }

  /**
   * Parse the responseText obtained from the xhr call
   * @see https://stackoverflow.com/a/41038197/1465919
   */
  public parseResponse(responseText: string): HTMLElement {
    this.currentHTML = responseText;

    const wrapper = document.createElement('template') as HTMLTemplateElement;
    wrapper.innerHTML = responseText;

    if (this.parseTitle === true) {
      // TODO this is slow, find out how this was working in biba!
      // const title = wrapper.getElementsByTagName('title').item(0);
      const title = this.findHTMLTagContent('title', wrapper.innerHTML);
      if (title) {
        document.title = title;
      }
    }
    return this.getContainer(wrapper);
  }

  /**
   * Get the main barba wrapper by the ID `wrapperId`
   */
  public getWrapper(): Element {
    return this._wrapper;
  }

  /**
   * Get the container on the current DOM,
   * or from an Element passed via argument
   */
  public getContainer(element?: HTMLTemplateElement | HTMLElement): HTMLElement {

    if (!element) {
      throw new Error('Barba.js: [getContainer] No element to get container from!');
    }

    if (!element) {
      throw new Error('Barba.js: [getContainer] DOM not ready!');
    }

    const container = this.parseContainer(element);

    if (!container) {
      throw new Error('[DOM] No container found');
    }

    return container;
  }

  /**
   * Get the namespace of the container
   */
  public getNamespace(element: HTMLElement): string | null {
    if (element && element.dataset && element.dataset.namespace) {
      return element.dataset.namespace;
    } else {
      return null;
    }
  }

  /**
   * Put the container on the page
   */
  public putContainer(element: HTMLElement | HTMLElement, appendChild: 'append' | 'replace' = 'replace') {
    this.debug('putContainer', element);
    element = element as HTMLElement;
    element.style.visibility = 'hidden';
    const wrapper = this.getWrapper();
    wrapper.appendChild(element);
  }

  /**
   * Get container selector
   */
  protected parseContainer(newPage: HTMLTemplateElement | HTMLElement): HTMLElement  {
    if (!newPage) {
      throw new Error(`No container with selector "${this.containerSelector}" found!`);
    }

    let result: HTMLElement | null;

    if ((newPage as HTMLTemplateElement).content) {
      result = (newPage as HTMLTemplateElement).content.querySelector(this.containerSelector);
    } else {
      result = newPage.querySelector(this.containerSelector);
    }

    if (!result) {
      throw new Error(`No container with selector "${this.containerSelector}" found! ${newPage.tagName}`);
    }

    return result;
  }

  /**
   * TODO move to utils?
   * @param tagName html tag name, e.g. `title`
   * @param html The html string in which you are searching the tag
   */
  protected findHTMLTags(tagName: string, html: string) {
    const regex = new RegExp(`<\s*${tagName}[^>]*>((.|\n)*?)<\s*\/\s*${tagName}>`, 'g');
    return html.match(regex);
  }

  protected findHTMLTagContent(tagName: string, html: string) {
    const matches = this.findHTMLTags(tagName, html);
    if (matches && matches.length > 0) {
      return matches[0].replace(`<${tagName}>`, '').replace(`</${tagName}>`, '').replace('&amp;', '&').replace('&lt;', '<').replace('&gt;', '>').trim();
    }
    return null;
  }
}

export { Dom };
