import { Response } from "../../types/response";

/**
 * Object that is going to deal with DOM parsing/manipulation
 * TODO move to @ribajs/core dom utils
 */
class Dom {
  public static getPrefetchLinkElements(content: DocumentFragment | Document) {
    // router-preload is a custom preloader
    return content.querySelectorAll(
      'link[href][rel="dns-prefetch"], link[href][rel="preconnect"], link[href][rel="prefetch"], link[href][rel="subresource"], link[href][rel="preload"], link[href][rel="router-preload"]'
    ) as NodeListOf<HTMLLinkElement>;
  }

  public static parseTitle(content: DocumentFragment | Document) {
    let title = "";
    // title = Dom.findHTMLTagContent('title', template.innerHTML) || '';
    const titleElement = content.querySelector("title");
    if (titleElement && titleElement.innerText) {
      title = titleElement.innerText;
    }
    return title;
  }

  /**
   * Parse the responseText obtained from the fetch call
   * @see https://stackoverflow.com/a/41038197/1465919
   */
  public static parseResponse(
    responseText: string,
    parseTitle: boolean,
    containerSelector: string,
    prefetchLinks = true
  ): Response {
    let title = "";
    let prefetchLinkElements:
      | NodeListOf<HTMLLinkElement>
      | Array<HTMLLinkElement> = [];
    const template = document.createElement("template") as HTMLTemplateElement;
    template.innerHTML = responseText;

    if (parseTitle) {
      title = this.parseTitle(template.content);
    }

    if (prefetchLinks) {
      prefetchLinkElements = this.getPrefetchLinkElements(template.content);
    }

    const container = this.getContainer(template, containerSelector);

    return {
      container,
      title,
      prefetchLinks: prefetchLinkElements,
    };
  }

  /**
   * Use this method only on the first page load
   */
  public static parseInitial(
    parseTitle: boolean,
    containerSelector: string,
    prefetchLinks = true
  ) {
    let title = "";
    let prefetchLinkElements:
      | NodeListOf<HTMLLinkElement>
      | Array<HTMLLinkElement> = [];

    // const template = document.createElement("template") as HTMLTemplateElement;
    // template.innerHTML = document.body.innerHTML;

    const container = this.getContainer(document, containerSelector);

    if (parseTitle) {
      title = this.parseTitle(document);
    }

    if (prefetchLinks) {
      prefetchLinkElements = this.getPrefetchLinkElements(document);
    }

    return {
      container: container,
      title,
      prefetchLinks: prefetchLinkElements,
    };
  }

  /**
   * Get the container on the current DOM,
   * or from an Element passed via argument
   */
  public static getContainer(
    element: HTMLTemplateElement | HTMLElement | Document,
    containerSelector: string
  ): HTMLElement {
    if (!element) {
      throw new Error(
        "Barba.js: [getContainer] No element to get container from, maybe the DOM is not ready!"
      );
    }

    const container = this.parseContainer(element, containerSelector);

    if (!container) {
      throw new Error("[DOM] No container found");
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
  public static putContainer(element: HTMLElement, wrapper: HTMLElement) {
    element = element as HTMLElement;
    element.style.visibility = "hidden";
    wrapper.appendChild(element);
  }

  /**
   * Get container selector
   */
  protected static parseContainer(
    newPage: HTMLTemplateElement | HTMLElement | Document,
    containerSelector: string
  ): HTMLElement {
    if (!newPage) {
      const error = new Error("New page not loaded!");
      console.error(error, newPage);
      throw error;
    }

    let result: HTMLElement | null;

    if ((newPage as HTMLTemplateElement).content) {
      result = (newPage as HTMLTemplateElement).content.querySelector(
        containerSelector
      );
    } else {
      result = newPage.querySelector(containerSelector);
    }

    if (!result) {
      const error = new Error(
        `No container with selector "${containerSelector}" found!`
      );
      console.error(error, newPage);
      throw error;
    }

    return result;
  }
}

export { Dom };
