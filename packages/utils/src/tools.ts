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
 */
export const getOS = () => {
  const ua = navigator.userAgent;
  const platform = window.navigator.platform;
  if (platform.includes("Win")) return "Windows";
  if (platform.includes("Mac")) return "MacOS";

  if (
    platform.includes("iPhone") ||
    platform.includes("iPad") ||
    platform.includes("iPod")
  )
    return "iOS";

  // iPad on iOS 13 detection
  if (ua.includes("Mac") && "ontouchend" in document) return "iOS";

  if (ua.includes("Android")) return "Android";
  if (platform.includes("Linux")) return "Linux";

  if (platform.includes("FreeBSD")) return "FreeBSD";
  if (platform.includes("OpenBSD")) return "OpenBSD";
  if (platform.includes("X11")) return "Unix";
  if (platform.includes("SunOS")) return "Solaris";

  if (platform.includes("webOS")) return "WebOS";

  if (platform.includes("PLAYSTATION 3")) return "PlayStation 3";
  if (platform.includes("PlayStation 4")) return "PlayStation 4";
  if (platform.includes("PSP")) return "PlayStation Portable";

  if (platform.includes("New Nintendo 3DS")) return "New Nintendo 3DS";
  if (platform.includes("Nintendo DSi")) return "Nintendo DSi";
  if (platform.includes("Nintendo 3DS")) return "Nintendo 3DS";
  if (platform.includes("Nintendo Wii")) return "Nintendo Wii";
  if (platform.includes("Nintendo WiiU")) return "Nintendo WiiU";

  if (platform.includes("PalmOS")) return "PalmOS";

  if (
    platform.includes("Nokia_Series_40") ||
    platform.includes("S60") ||
    platform.includes("Symbian")
  )
    return "Symbian";

  return "Unknown";
};

// TODO more tests for other devices
export const getOSType = () => {
  const os = getOS();

  let isMobile = false;
  let isDesktop = false;
  let isGameConsole = false;
  let isTV = false;

  switch (os) {
    case "Windows":
    case "MacOS":
    case "Linux":
    case "FreeBSD":
    case "OpenBSD":
    case "Unix":
    case "Solaris":
      isDesktop = true;
      break;

    case "iOS":
    case "Android":
      isMobile = true;
      break;

    case "WebOS":
      isTV = true;
      break;
  }

  if (os.includes("PlayStation") || os.includes("Nintendo")) {
    isGameConsole = true;
  }

  return {
    isMobile,
    isDesktop,
    isGameConsole,
    isTV,
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

export const isTV = () => {
  return getOSType().isTV;
};
