/**
 * Prepends the extern strapi url to a url
 */
export const strapiFormatter = {
  name: "strapi",
  read(url?: string) {
    if (!url) {
      return "";
    }
    if (typeof url !== "string") {
      console.warn(
        `Strapi formatter works only with strings, but got "${typeof url}"`
      );
      return url;
    }
    if (url.startsWith("http")) {
      return url;
    }

    let host =
      (window as any)?.env?.STRAPI_REMOTE_URL ||
      window?.ssr?.env?.STRAPI_LOCAL_URL ||
      "";

    if (!host) {
      throw new Error("[strapiFormatter] Host not found, please make sure that window.env.STRAPI_REMOTE_URL or window.ssr.env.STRAPI_LOCAL_URL is set!");
    }

    if (host.endsWith("/")) {
      host = host.substring(0, host.length - 1);
    }

    if (url.startsWith("/")) {
      url = url.substring(1);
    }

    return `${host}/${url}`;
  },
};
