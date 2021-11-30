import { BinderDeprecated } from "../types";

/**
 * srcset-size
 * Sets an url with size to the `srcset` attribute
 */
export const srcsetSizeBinder: BinderDeprecated<string> = {
  name: "srcset-*",
  routine(el: HTMLUnknownElement, url: string) {
    const size: string = this.args[0] as string;
    let srcset = el.getAttribute("srcset");
    if (typeof srcset !== "string") {
      srcset = "";
    }
    if (typeof url === "string" && url.length > 0) {
      const seperator = srcset.length > 0 ? ", " : "";
      // Add size to srcset attribute
      srcset += `${seperator}${url} ${size}`;
    } else {
      // Remove size from srcset attribute
      let sizes = srcset.split(",");
      sizes = sizes.map((iterSize) => iterSize.trim());
      sizes = sizes.filter((iterSize) => !iterSize.includes(size));
      srcset = sizes.join(", ") || "";
    }
    el.setAttribute("srcset", srcset);
  },
};
