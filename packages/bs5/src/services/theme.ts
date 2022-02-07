import { EventDispatcher } from "@ribajs/events";
import { themeChoices } from "../constants";

import type { ThemeChoice, ThemeData, ThemeChangedCallback } from "../types";

/**
 * The theme service is used to change and observe the color scheme from the OS or the user.
 * Can be dark or light respectively.
 * @credits https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
 */
export class ThemeService {
  protected eventDispatcher = EventDispatcher.getInstance();

  protected static instance?: ThemeService;

  protected constructor() {
    this.addEventListeners();
    const data = this.init();
    const selectEl = document.getElementById(
      "theme"
    ) as HTMLSelectElement | null;

    if (selectEl) this.select(data.choice, selectEl);
  }

  public static getSingleton() {
    if (ThemeService.instance) {
      return ThemeService.instance;
    }

    return this.setSingleton();
  }

  public static setSingleton() {
    if (ThemeService.instance) {
      throw new Error(`Singleton of ThemeService already defined!`);
    }
    ThemeService.instance = new ThemeService();
    return ThemeService.instance;
  }

  protected addEventListeners() {
    // To watch for changes
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        this.triggerChange();
      });
  }

  /**
   * Sets the last selected theme (which was stored in the localStorage)
   * @param choices The theme theme-(light, dark or os)
   * @returns The selected theme or or `null` in case of an error
   */
  public init() {
    const savedTheme =
      (localStorage.getItem("bs5-theme") as ThemeChoice) || "theme-os";

    return this.set(savedTheme);
  }

  /**
   * Selects the option of a global theme select element
   * @param selectEl
   * @param choice
   */
  public select(choice: ThemeChoice, selectEl: HTMLSelectElement) {
    if (selectEl?.nodeName === "SELECT") {
      selectEl.value = choice;
    }
  }

  /**
   * Get the default data for internal use.
   * The default is the system light theme.
   * @returns
   */
  protected getDefaultData(): ThemeData {
    return {
      supported: !!window.matchMedia, // TODO more checks?
      isDark: false,
      isLight: false,
      systemIsDark: false,
      systemIsLight: true,
      bySystem: true,
      byUser: false,
      choice: "theme-os",
    };
  }

  protected triggerChange(oldValue?: ThemeData) {
    if (!oldValue) {
      oldValue = this.getDefaultData();
    }
    const newValue = this.get();
    this.eventDispatcher.trigger("theme-change", {
      oldValue,
      newValue,
    });
    return newValue;
  }

  /**
   * Adds an one time event listener triggered on theme change
   * @param cb
   * @param thisContext
   */
  onceChange(cb: ThemeChangedCallback, thisContext?: any): void {
    this.eventDispatcher.once("theme-change", cb, thisContext);
  }
  /**
   * Adds an event listener triggered on theme change
   * @param cb
   * @param thisContext
   */
  onChange(cb: ThemeChangedCallback, thisContext?: any): void {
    this.eventDispatcher.on("theme-change", cb, thisContext);
  }
  /**
   * Removes the theme changed event listener
   * @param cb
   * @param thisContext
   */
  offChange(cb?: ThemeChangedCallback, thisContext?: any): void {
    this.eventDispatcher.off("theme-change", cb, thisContext);
  }

  /**
   * Sets the theme class to the <html>.
   * - `theme-os` means that the theme will be used by the operating system (which corresponds to theme-light or theme-dark)
   * - `theme-light` means that the light theme will be used
   * - `theme-dark` means that the dark theme will be used
   * @param choices
   * @returns The selected theme
   */
  set(newColorScheme: ThemeChoice): ThemeData {
    const oldData = this.get();
    if (!themeChoices.includes(newColorScheme)) {
      console.warn(
        `Unsupported theme "${newColorScheme}", set instead the default "theme-os".`
      );
      newColorScheme = "theme-os";
    }
    localStorage.setItem("bs5-theme", newColorScheme);
    document.documentElement.classList.remove(
      "theme-light",
      "theme-dark",
      "theme-os"
    );
    document.documentElement.classList.add(newColorScheme);
    return this.triggerChange(oldData);
  }

  get(): ThemeData {
    const data = this.getDefaultData();
    data.systemIsDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    data.systemIsLight = !data.systemIsDark;

    if (document.documentElement.classList.contains("theme-os")) {
      data.bySystem = true;
      data.byUser = false;
      data.choice = "theme-os";
      data.isDark = data.systemIsDark;
      data.isLight = data.systemIsLight;
    } else {
      data.bySystem = false;
      data.byUser = true;
      if (document.documentElement.classList.contains("theme-dark")) {
        data.isDark = true;
        data.choice = "theme-dark";
      }
      if (document.documentElement.classList.contains("theme-light")) {
        data.isLight = true;
        data.choice = "theme-light";
      }
    }
    return data;
  }
}
