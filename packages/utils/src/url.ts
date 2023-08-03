/**
 * get param from hash
 */
export const getUrlParameter = (name: string, url: string) => {
  if (!url) {
    url = window.location.href;
  }
  name = name.replace(/[[\]]/g, "\\$&");
  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
  const results = regex.exec(url);
  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }
  return decodeURIComponent(results[2].replace(/\+/g, " "));
};

/**
 * get location object ofpath or address bar
 * @see http://stackoverflow.com/a/736970/1465919
 *
 * @example
 * var l = getLocation("http://example.com:3000/pathname/?search=test#hash");
 * =>
 * l.protocol; // => "http:"
 * l.host;     // => "example.com:3000"
 * l.hostname; // => "example.com"
 * l.port;     // => "3000"
 * l.pathname; // => "/pathname/"
 * l.hash;     // => "#hash"
 * l.search;   // => "?search=test"
 * l.origin;   // => "http://example.com:3000"
 */
export const getLocation = (url?: string): Location => {
  if (!url) {
    return window.location;
  }
  const l = document.createElement("a");
  l.href = url;
  return l as any as Location;
};

/**
 * If the webapps url is https://mysupersite.org and the url is https://mysupersite.org/subpage?search=test
 * this method will return /subpage?search=test
 * If the url is https://anothersite.org/subpage?search=test this method will return https://anothersite.org/subpage?search=test
 * @param url
 */
export const normalizeUrl = (
  url?: string,
): { url: string; location: Location } => {
  const location = getLocation(url);
  const curHostname = getLocation().hostname;
  if (location.hostname === curHostname) {
    return {
      url: location.pathname + location.search + location.hash,
      location,
    };
  } else {
    return {
      url: getUrl(url),
      location,
    };
  }
};

/**
 * Return the current full url
 *
 * @return {string} currentUrl
 */
export const getUrl = (url?: string): string => {
  const location = getLocation(url);
  return (
    location.protocol +
    "//" +
    location.host +
    location.pathname +
    location.search +
    location.hash
  );
};

/**
 * Check if we are on the route
 */
export const onRoute = (checkUrl?: string, compareQueryParam = false) => {
  if (checkUrl) {
    const location1 = getLocation();
    const location2 = getLocation(checkUrl);

    if (compareQueryParam) {
      // TODO ignore query parameter order
      if (location1.search !== location2.search) {
        return false;
      }
    }

    return (
      location1.hostname === location2.hostname &&
      location1.pathname === location2.pathname
    );
  }
  return false;
};

/**
 * Check if the current location url stats with a url or is equal
 */
export const onParentRoute = (checkUrl?: string) => {
  if (checkUrl) {
    const location = getLocation();
    const pathname = location.pathname;
    const hostname = location.hostname;
    const checkLocation = getLocation(checkUrl);
    const checkPathname = checkLocation.pathname;
    const checkHostname = checkLocation.hostname;
    return hostname === checkHostname && pathname.startsWith(checkPathname);
  }
  return false;
};

/**
 * Given an url, return it without the hash
 *
 * @param url
 * @return newCleanUrl
 */
export const cleanLink = (url: string): string => {
  return url.replace(/#.*/, "");
};

/**
 * Return the port number normalized, eventually you can pass a string to be normalized.
 *
 * @param p
 * @return port
 */
export const getPort = (p?: string, url?: string) => {
  const location = getLocation(url);
  const port = typeof p !== "undefined" ? p : location.port;
  const protocol = location.protocol;

  if (port !== "") {
    return Number(port);
  }
  if (protocol === "http:") {
    return 80;
  }

  if (protocol === "https:") {
    return 443;
  }
};

/**
 * Test if url is absolute or relative
 * @see https://stackoverflow.com/a/19709846/1465919
 */
export const isAbsoluteUrl = (url: string) => {
  if (!url) {
    return false;
  }
  const isProtokoll = new RegExp("^(?:[a-z]+:)?//", "i");
  const isAbsolute =
    isProtokoll.test(url) ||
    url.startsWith("mailto:") ||
    url.startsWith("tel:") ||
    url.startsWith("fax:");
  return isAbsolute;
};

export const isExternalUrl = (absoluteUrl: string) => {
  if (isAbsoluteUrl(absoluteUrl)) {
    const location = getLocation();
    const host = location.protocol + "//" + location.hostname;
    let isExternal = true;
    if (absoluteUrl.startsWith(host)) {
      isExternal = false;
    }
    return isExternal;
  }
  return false;
};

export const isInternalUrl = (url: string) => {
  return !isExternalUrl(url);
};

/**
 * Get hash from address bar or url if set
 */
export const getHash = (url?: string) => {
  return getLocation(url).hash;
};

/**
 * Change hash from address bar
 */
export const updateHash = (hash: string) => {
  return (window.location.hash = hash);
};

/**
 * Remove hash from address bar
 */
export const removeHash = () => {
  return history.pushState(
    "",
    document.title,
    window.location.pathname + window.location.search,
  );
};
