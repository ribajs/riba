import { Debug, JQuery } from '@ribajs/core';
/**
 * Object that is going to deal with DOM parsing/manipulation
 *
 * @namespace Barba.Pjax.Dom
 * @type {Object}
 */
class Dom {
  /**
   * The name of the data attribute on the container
   *
   * @default
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

  private _$wrapper: JQuery<Element>;

  private parseTitle: boolean;

  private debug = Debug('router:Dom');

  constructor($wrapper: JQuery<Element>, containerSelector = '[data-namespace]', parseTitle: boolean) {
    this._$wrapper = $wrapper;
    this.containerSelector = containerSelector;
    this.parseTitle = parseTitle;
  }

  /**
   * Parse the responseText obtained from the xhr call
   * @see https://stackoverflow.com/a/41038197/1465919
   */
  public parseResponse(responseText: string): JQuery<Element> {
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
  public getWrapper(): JQuery<Element> {
    return this._$wrapper;
  }

  /**
   * Get the container on the current DOM,
   * or from an Element passed via argument
   */
  public getContainer(element?: HTMLElement | HTMLTemplateElement | JQuery<HTMLElement | HTMLTemplateElement>): JQuery<Element> {

    if (!element) {
      throw new Error('Barba.js: [getContainer] No element to get container from!');
    }

    let el: HTMLElement | HTMLTemplateElement ;

    if ((element as JQuery<Node>).jquery) {
      el = (element as JQuery<HTMLElement | HTMLTemplateElement>)[0];
    } else {
      el = element as HTMLTemplateElement | HTMLElement;
    }

    if (!el) {
      throw new Error('Barba.js: [getContainer] DOM not ready!');
    }

    const container = this.parseContainer(el);

    if (!container) {
      throw new Error('[DOM] No container found');
    }

    return JQuery(container);

    // if (!$newPage) {
    //   $newPage = JQuery(document.body);
    // }
    // if (!$newPage) {
    //   throw new Error('[DOM] DOM not ready!');
    // }
    // const $container = this.parseContainer($newPage[0] as Element);
    // if (!$container) {
    //   throw new Error('[DOM] No container found');
    // }
    // this.debug('getContainer', $container);
    // return $container;
  }

  /**
   * Get the namespace of the container
   */
  public getNamespace($element: JQuery<Element>): string {
    if ($element && $element.data()) {
      return $element.data('namespace');
    } else {
      throw new Error('[DOM] Missing data-namespace attribute');
    }
  }

  /**
   * Put the container on the page
   */
  public putContainer(element: HTMLElement | JQuery<Element>, appendChild: 'append' | 'replace' = 'replace') {
    this.debug('putContainer', element);
    if ((element as JQuery<Element>).jquery) {
      element = element as JQuery<Element>;
      element.css('visibility', 'hidden');
      const wrapper = this.getWrapper()[0];
      for (const el of element) {
        wrapper.appendChild(el);
      }
    } else {
      element = element as HTMLElement;
      element.style.visibility = 'hidden';
      const wrapper = this.getWrapper()[0];
      wrapper.appendChild(element);
    }

  }

  /**
   * Get container selector
   *
   * @memberOf Barba.Pjax.Dom
   * @private
   * @param element
   */
  public parseContainer(newPage: HTMLTemplateElement | HTMLElement): Element  {
    if (!newPage) {
      throw new Error(`No container with selector "${this.containerSelector}" found!`);
    }

    let result: Element | null;

    if ((newPage as HTMLTemplateElement).content) {
      result = (newPage as HTMLTemplateElement).content.querySelector(this.containerSelector);
    } else {
      result = newPage.querySelector(this.containerSelector);
    }

    if (!result) {
      throw new Error(`No container with selector "${this.containerSelector}" found! ${newPage.tagName}`);
    }

    return result;
    // const $container = $newPage.find(this.containerSelector);
    // if (!$container.length) {
    //   this.debug(`No container with selector "${this.containerSelector}" found!`, $newPage);
    //   throw new Error(`No container with selector "${this.containerSelector}" found!`);
    // }
    // return $container;
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
