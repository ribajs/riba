import { Response } from '../../interfaces/response';

/**
 * Object that is going to deal with DOM parsing/manipulation
 * TODO move to @ribajs/core dom utils
 */
class Dom {

  /**
   * Parse the responseText obtained from the fetch call
   * @see https://stackoverflow.com/a/41038197/1465919
   */
  public static parseResponse(responseText: string, parseTitle: boolean, containerSelector: string, prefetchLinks: boolean = true): Response {
    let title = '';
    let prefetchLinkElements: NodeListOf<HTMLLinkElement> | Array<HTMLLinkElement> = [];
    const template = document.createElement('template') as HTMLTemplateElement;
    template.innerHTML = responseText;

    if (parseTitle) {
      // title = Dom.findHTMLTagContent('title', template.innerHTML) || '';
      const titleElement = template.content.querySelector('title');
      if (titleElement && titleElement.innerText) {
        title = titleElement.innerText;
      }
    }

    if (prefetchLinks) {
      prefetchLinkElements = template.content.querySelectorAll('link[href][rel="dns-prefetch"], link[href][rel="preconnect"], link[href][rel="prefetch"], link[href][rel="subresource"], link[href][rel="preload"]') as NodeListOf<HTMLLinkElement>;
    }

    return {
      container: this.getContainer(template, containerSelector),
      title,
      prefetchLinks: prefetchLinkElements,
    };
  }

  /**
   * Get the container on the current DOM,
   * or from an Element passed via argument
   */
  public static getContainer(element: HTMLTemplateElement | HTMLElement, containerSelector: string): HTMLElement {

    if (!element) {
      throw new Error('Barba.js: [getContainer] No element to get container from, maybe the DOM is not ready!');
    }

    const container = this.parseContainer(element, containerSelector);

    if (!container) {
      throw new Error('[DOM] No container found');
    }

    return container;
  }

  /**
   * Get the namespace of the container
   */
  public static getNamespace(element: HTMLElement): string | null {
    if (element && element.dataset && element.dataset.namespace) {
      return element.dataset.namespace;
    } else {
      return null;
    }
  }

  /**
   * Put the container on the page
   */
  public static putContainer(element: HTMLElement, wrapper: HTMLElement, appendChild: 'append' | 'replace' = 'replace') {
    element = element as HTMLElement;
    element.style.visibility = 'hidden';
    wrapper.appendChild(element);
  }

  /**
   * Get container selector
   */
  protected static parseContainer(newPage: HTMLTemplateElement | HTMLElement, containerSelector: string): HTMLElement  {
    if (!newPage) {
      const error = new Error('New page not loaded!');
      console.error(error, newPage);
      throw error;
    }

    let result: HTMLElement | null;

    if ((newPage as HTMLTemplateElement).content) {
      result = (newPage as HTMLTemplateElement).content.querySelector(containerSelector);
    } else {
      result = newPage.querySelector(containerSelector);
    }

    if (!result) {
      const error = new Error(`No container with selector "${containerSelector}" found!`);
      console.error(error, newPage);
      throw error;
    }

    return result;
  }
}

export { Dom };
