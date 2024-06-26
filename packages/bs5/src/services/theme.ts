import { EventDispatcher } from "@ribajs/events";
import { themeChoices } from "../constants/index.js";
import { Bs5Service } from "./bs5.service.js";

import type {
  ThemeChoice,
  ThemeData,
  ThemeChangedCallback,
} from "../types/index.js";

/**
 * The theme service is used to change and observe the color scheme from the OS or the user.
 * Can be dark or light respectively.
 * @credits https://stackoverflow.com/questions/56393880/how-do-i-detect-dark-mode-using-javascript
 */
export class ThemeService {
  protected eventDispatcher = EventDispatcher.getInstance();

  protected static instance?: ThemeService;
  protected bs5 = Bs5Service.getSingleton();
  public current: ThemeChoice = "os";

  protected constructor() {
    this.addEventListeners();
    const data = this.init();
    const selectEl = document.getElementById(
      "theme",
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
      .addEventListener("change", (e: MediaQueryListEvent) => {
        this.triggerChange(e);
      });
  }

  /**
   * Sets the last selected theme (which was stored in the localStorage)
   * @param choices The theme theme-(light, dark or os)
   * @returns The selected theme or or `null` in case of an error
   */
  public init() {
    let savedTheme: ThemeChoice = "os";
    if (this.bs5.options.allowStoreDataInBrowser) {
      savedTheme = (localStorage.getItem("bs5-theme") || "os") as ThemeChoice;
    }

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
      choice: "os",
    };
  }

  protected triggerChange(e?: MediaQueryListEvent, oldValue?: ThemeData) {
    if (!oldValue) {
      oldValue = this.getDefaultData();
    }
    const newValue = this.getScheme();
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
   * - `os` means that the theme will be used by the operating system (which corresponds to light or dark)
   * - `light` means that the light theme will be used
   * - `dark` means that the dark theme will be used
   * @param choices
   * @returns The selected theme
   */
  set(newColorScheme: ThemeChoice): ThemeData {
    const oldScheme = this.getScheme();
    if (!themeChoices.includes(newColorScheme)) {
      console.warn(
        `Unsupported theme "${newColorScheme}", set instead the default "os".`,
      );
      newColorScheme = "os";
    }
    if (this.bs5.options.allowStoreDataInBrowser) {
      localStorage.setItem("bs5-theme", newColorScheme);
    }

    if (newColorScheme === "os") {
      const newScheme = this.getScheme(newColorScheme);
      document.documentElement.setAttribute(
        "data-bs-theme",
        newScheme.isDark ? "dark" : "light",
      );
    } else {
      document.documentElement.setAttribute("data-bs-theme", newColorScheme);
    }
    this.current = newColorScheme;
    return this.triggerChange(undefined, oldScheme);
  }

  getScheme(choice: ThemeChoice = this.current): ThemeData {
    const data = this.getDefaultData();
    data.systemIsDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    data.systemIsLight = !data.systemIsDark;

    if (choice === "os") {
      data.bySystem = true;
      data.byUser = false;
      data.choice = "os";
      data.isDark = data.systemIsDark;
      data.isLight = data.systemIsLight;
    } else {
      data.bySystem = false;
      data.byUser = true;
      if (choice === "dark") {
        data.isDark = true;
        data.choice = "dark";
      }
      if (choice === "light") {
        data.isLight = true;
        data.choice = "light";
      }
    }
    return data;
  }
}
