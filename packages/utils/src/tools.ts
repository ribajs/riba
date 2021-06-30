const fallbackCopyTextToClipboard = (text: string) => {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    const msg = successful ? "successful" : "unsuccessful";
    console.log(`Fallback: Copying text command was ${msg}: ${text}`);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
};

/**
 * Copy text to clipboard
 * @see https://stackoverflow.com/a/30810322
 */
export const copyTextToClipboard = async (text: string) => {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  try {
    await navigator.clipboard.writeText(text);
    console.log("Copying to clipboard was successful: " + text);
  } catch (error) {
    console.error("Could not copy text: ", error);
  }
};

/**
 * Get the Operating system the browser is running on
 * @see https://stackoverflow.com/questions/19877924/what-is-the-list-of-possible-values-for-navigator-platform-as-of-today
 * @see https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
 * @see https://github.com/podlove/podlove-subscribe-button/blob/master/src/coffee/user_agent.coffee
 */
export const getOS = () => {
  const ua = navigator.userAgent;
  const platform = window.navigator.platform;

  const uAs = {
    windows7: /Windows NT 6.1/,
    windows8: /Windows NT 6.2/,
    windows81: /Windows NT 6.3/,
    windows10: /Windows NT 10.0/,
    windows: /windows/i,
    windowsPhone: /trident/i,
    android: /android/i,
    ios: /(ipad|iphone|ipod)/i,
    linux: /(linux)/i,
    unix: /(openbsd|freebsd|netbsd)/i,
    osxCatalina: /macintosh.+10(_|\.)15/i,
    osxBigSur: /macintosh.+((10(_|\.)16)|(11(_|\.)))/i,
    osx: /macintosh/i,
    mac: /mac/i,
  };

  const platforms = {
    linux: /Linux/i,

    unix: /(FreeBSD|OpenBSD|X11|SunOS)/i,
    webOS: /webOS/i,

    playstation3: /playstation 3/i,
    playstation4: /playstation 4/i,
    PlaystationPortable: /psp/i,

    newNintendo3Ds: /new nintendo 3ds/i,
    nintendoDsi: /nintendo dsi/i,
    nintendo3Ds: /nintendo 3ds/i,
    nintendoWii: /nintendo wii/i,
    nintendoWiiU: /nintendo wiiu/i,

    palmos: /palmos/i,

    symbian: /(nokia_series_40|s60|symbian)/i,
  };

  for (const uAKey of Object.keys(uAs) as Array<keyof typeof uAs>) {
    const regex = uAs[uAKey];
    if (regex.test(ua)) {
      // iPad on iOS 13 detection
      if (uAKey === "mac" && "ontouchend" in document) {
        return "ios";
      }
      return uAKey;
    }
  }

  for (const platformKey of Object.keys(platforms) as Array<
    keyof typeof platforms
  >) {
    const regex = platforms[platformKey];
    if (regex.test(platform)) {
      return platformKey;
    }
  }

  return "Unknown";
};

// TODO test TV
export const getOSType = () => {
  const os = getOS();

  let isMobile = false;
  let isDesktop = false;
  let isGameConsole = false;

  switch (os) {
    case "windows":
    case "windows10":
    case "windows7":
    case "windows8":
    case "windows81":
    case "osxBigSur":
    case "osxCatalina":
    case "osx":
    case "mac":
    case "linux":
    case "unix":
      isDesktop = true;
      break;

    case "ios":
    case "android":
    case "windowsPhone":
    case "symbian":
      isMobile = true;
      break;
  }

  if (os.includes("playstation") || os.includes("nintendo")) {
    isGameConsole = true;
  }

  return {
    isMobile,
    isDesktop,
    isGameConsole,
  };
};

export const isMobile = () => {
  return getOSType().isMobile;
};

export const isDesktop = () => {
  return getOSType().isDesktop;
};

export const isGameConsole = () => {
  return getOSType().isGameConsole;
};
