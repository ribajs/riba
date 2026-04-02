import { Component, TemplateFunction, ScopeBase } from "@ribajs/core";
import { ThemeService } from "../../services/theme.service.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import template from "./tw-theme-button.component.html?raw";

import type { ThemeChoice, ThemeChangedData } from "../../types/index.js";

const THEME_CHOICES: ThemeChoice[] = ["os", "light", "dark"];

interface Scope extends ScopeBase {
  mode: "dropdown" | "icon";
  labels: Record<ThemeChoice, string>;
  iconSize: number;
  setTheme: TwThemeButtonComponent["setTheme"];
  selectTheme: TwThemeButtonComponent["selectTheme"];
  toggleTheme: TwThemeButtonComponent["toggleTheme"];
  selected: ThemeChoice | undefined;
  choices: ThemeChoice[];
}

export class TwThemeButtonComponent extends Component {
  public static tagName = "tw-theme-button";

  protected autobind = true;

  protected theme: ThemeService;

  static get observedAttributes(): string[] {
    return ["mode", "labels", "icon-size"];
  }

  public scope: Scope = {
    mode: "icon",
    labels: {
      os: "System",
      light: "Light",
      dark: "Dark",
    },
    iconSize: 24,
    setTheme: this.setTheme.bind(this),
    selectTheme: this.selectTheme.bind(this),
    toggleTheme: this.toggleTheme.bind(this),
    selected: undefined,
    choices: THEME_CHOICES,
  };

  constructor() {
    super();
    this.theme = ThemeService.getSingleton();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(TwThemeButtonComponent.observedAttributes);
    this.addThemeListeners();
    this.initTheme();
  }

  protected addThemeListeners() {
    this.theme.onChange((data) => {
      this.onThemeChange(data);
    });
  }

  protected onThemeChange(data: ThemeChangedData) {
    this.scope.selected = data.current.choice;
  }

  protected async beforeBind() {
    this.initTheme();
  }

  initTheme() {
    const data = this.theme.getThemeData();
    this.scope.selected = data.choice || undefined;
  }

  public setTheme(theme: ThemeChoice) {
    this.theme.set(theme);
  }

  /**
   * Used in `dropdown` mode (select element).
   */
  public selectTheme() {
    if (this.scope.selected) {
      this.theme.set(this.scope.selected);
    }
  }

  /**
   * Used in `icon` mode (button element). Cycles through light -> dark -> os.
   */
  public toggleTheme() {
    const data = this.theme.getThemeData();
    const resolved = data.resolved;
    const choice = data.choice;

    if (choice === "os") {
      // OS mode: switch to opposite of current resolved
      if (resolved === "light") {
        this.theme.set("dark");
      } else {
        this.theme.set("light");
      }
    } else if (choice === "dark") {
      // From dark, go to light (or os if system prefers dark)
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      if (systemPrefersDark) {
        this.theme.set("os");
      } else {
        this.theme.set("light");
      }
    } else {
      // From light, go to dark (or os if system prefers light)
      const systemPrefersLight = window.matchMedia(
        "(prefers-color-scheme: light)",
      ).matches;
      if (systemPrefersLight) {
        this.theme.set("os");
      } else {
        this.theme.set("dark");
      }
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return template;
    } else {
      return null;
    }
  }
}
