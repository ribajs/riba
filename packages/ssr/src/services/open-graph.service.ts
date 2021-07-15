import { OpenGraph, OpenGraphNamespaces } from "../types";

export class OpenGraphService {
  public static getHeadElement(): HTMLHeadElement {
    return document.head || document.getElementsByName("head")[0];
  }

  public static getHtmlElement(): HTMLHtmlElement {
    return (document.body.parentNode ||
      document.getElementsByName("html")[0]) as HTMLHtmlElement;
  }

  public static createMetaTags(data: OpenGraph, prefix = "og:") {
    const metaElements: HTMLMetaElement[] = [];
    for (const property of Object.keys(data)) {
      const contents: any[] = Array.isArray(data[property])
        ? data[property]
        : [data[property]];

      for (const content of contents) {
        if (typeof content === "object") {
          metaElements.push(
            ...this.createMetaTags(content, `${prefix}:${property}`)
          );
        } else {
          const meta = document.createElement("meta");
          meta.setAttribute("property", `${prefix}${property}`);
          meta.setAttribute("content", content);
          metaElements.push(meta);
        }
      }
    }
    return metaElements;
  }

  public static setMetaTags(data: OpenGraph) {
    const metaElements = this.createMetaTags(data);
    const head = this.getHeadElement();
    for (const metaElement of metaElements) {
      head.appendChild(metaElement);
    }
  }

  /**
   * @example
   *  <head prefix='og: https://ogp.me/ns# fb: https://ogp.me/ns/fb# website: https://ogp.me/ns/website#'>
   **/
  public static setNamespaces(namespaces: OpenGraphNamespaces) {
    const htmlEl = this.getHtmlElement();
    let prefixStr = "";
    for (const prefix of Object.keys(namespaces)) {
      const ns = namespaces[prefix];
      if (prefixStr) {
        prefixStr += " ";
      }
      prefixStr += `${prefix}: ${ns}`;
    }
    htmlEl.setAttribute("prefix", prefixStr);
  }

  public static setLocale(locale: string) {
    const htmlEl = this.getHtmlElement();
    htmlEl.setAttribute("lang", locale);
  }

  public static set(
    data: OpenGraph,
    namespaces: OpenGraphNamespaces = { og: "https://ogp.me/ns#" }
  ) {
    this.setNamespaces(namespaces);
    this.setMetaTags(data);
    if (typeof data.locale === "string") {
      this.setLocale(data.locale);
    }
  }
}
