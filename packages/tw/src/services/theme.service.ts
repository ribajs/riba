import { EventDispatcher } from "@ribajs/events";
import { TwService } from "./tw.service.js";

import type {
  ThemeChoice,
  ThemeData,
  ThemeChangedData,
} from "../types/index.js";

const STORAGE_KEY = "tw-theme";
const THEME_CHOICES: ThemeChoice[] = ["os", "light", "dark"];

/**
 * Theme service for Tailwind dark mode.
 *
 * Uses class-based dark mode by toggling the `dark` class on `<html>`.
 * Persists the user's choice in localStorage.
 */
export class ThemeService {
  protected eventDispatcher = EventDispatcher.getInstance();

  protected static instance?: ThemeService;
  protected tw: TwService;
  public current: ThemeChoice = "os";

  protected constructor() {
    this.tw = TwService.getSingleton();
    this.addEventListeners();
    this.init();
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
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        this.set(this.current);
      });
  }

  public init() {
    let savedTheme: ThemeChoice = "os";
    if (this.tw.options.allowStoreDataInBrowser) {
      savedTheme = (localStorage.getItem(STORAGE_KEY) || "os") as ThemeChoice;
    }
    return this.set(savedTheme);
  }

  public set(newChoice: ThemeChoice): ThemeData {
    const oldData = this.getThemeData();

    if (!THEME_CHOICES.includes(newChoice)) {
      console.warn(`Unsupported theme "${newChoice}", falling back to "os".`);
      newChoice = "os";
    }

    if (this.tw.options.allowStoreDataInBrowser) {
      localStorage.setItem(STORAGE_KEY, newChoice);
    }

    const resolved = this.resolveTheme(newChoice);

    // Toggle the `dark` class on <html> for Tailwind's dark: variant
    if (resolved === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    this.current = newChoice;
    const newData = this.getThemeData(newChoice);
    this.triggerChange(oldData, newData);
    return newData;
  }

  public getThemeData(choice: ThemeChoice = this.current): ThemeData {
    const resolved = this.resolveTheme(choice);
    return { choice, resolved };
  }

  /**
   * Resolves a theme choice to "light" or "dark".
   * "os" → system preference, otherwise the explicit choice.
   */
  protected resolveTheme(choice: ThemeChoice): "light" | "dark" {
    if (choice === "os") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
    return choice;
  }

  protected triggerChange(previous: ThemeData, current: ThemeData) {
    const data: ThemeChangedData = { previous, current };
    this.eventDispatcher.trigger("theme-change", data);
  }

  onChange(cb: (data: ThemeChangedData) => void, thisContext?: any): void {
    this.eventDispatcher.on("theme-change", cb, thisContext);
  }

  onceChange(cb: (data: ThemeChangedData) => void, thisContext?: any): void {
    this.eventDispatcher.once("theme-change", cb, thisContext);
  }

  offChange(cb?: (data: ThemeChangedData) => void, thisContext?: any): void {
    this.eventDispatcher.off("theme-change", cb, thisContext);
  }
}
