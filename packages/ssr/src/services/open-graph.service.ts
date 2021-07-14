import { OpenGraph } from "../types/open-graph";

export class OpenGraphService {
  public static getHead() {
    return document.head || document.getElementsByName("head")[0];
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
    const head = this.getHead();
    for (const metaElement of metaElements) {
      head.appendChild(metaElement);
    }
  }
}
