import { ThemeChoice } from "../types";
import { themeChoices } from "../constants";

/**
 * Sets the last selected theme (which was stored in the localStorage)
 * @param choices The theme theme-(light, dark or os)
 * @returns The selected theme or or `null` in case of an error
 */
export function initTheme(choices?: HTMLSelectElement | null) {
  if (!choices) {
    choices = document.getElementById("theme") as HTMLSelectElement | null;
  }

  const savedTheme =
    (localStorage.getItem("bs5-theme") as ThemeChoice) || "theme-os";

  if (choices?.nodeName === "SELECT") {
    choices.value = savedTheme;
  }

  return setTheme(savedTheme);
}

/**
 * Sets the theme class to the body.
 * - `theme-os` means that the theme will be used by the operating system (which corresponds to theme-light or theme-dark)
 * - `theme-light` means that the light theme will be used
 * - `theme-dark` means that the dark theme will be used
 * @param choices
 * @returns The selected theme
 */
export function setTheme(theme: ThemeChoice): ThemeChoice {
  if (!themeChoices.includes(theme)) {
    console.warn(
      `Unsupported theme "${theme}", set instead the default "theme-os".`
    );
    theme = "theme-os";
  }
  localStorage.setItem("bs5-theme", theme);
  document.body.classList.remove("theme-light", "theme-dark", "theme-os");
  document.body.classList.add(theme);
  return theme;
}
