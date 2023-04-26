import { Component, TemplateFunction } from "@ribajs/core";
import { ThemeService } from "../../services/theme.js";
import { hasChildNodesTrim } from "@ribajs/utils";
import template from "./bs5-theme-button.component.pug";
import { themeChoices } from "../../constants/index.js";

import type {
  Bs5ThemeButtonComponentScope,
  ThemeChoice,
  ThemeChangedData,
  JsxBs5ThemeButtonProps,
} from "../../types/index.js";

/**
 * @see https://github.com/TypeStrong/typedoc/blob/master/src/lib/output/themes/default/assets/typedoc/Theme.ts
 */
export class Bs5ThemeButtonComponent extends Component {
  public static tagName = "bs5-theme-button";

  protected theme: ThemeService;

  static get observedAttributes(): (keyof JsxBs5ThemeButtonProps)[] {
    return ["mode", "labels", "light-icon-src", "icon-size", "dark-icon-src"];
  }

  public scope: Bs5ThemeButtonComponentScope = {
    // Options // Attributes
    mode: "dropdown",
    labels: {
      os: "OS",
      light: "Light",
      dark: "Dark",
    },
    lightIconSrc: "/iconset/svg/icon_sun.svg",
    darkIconSrc: "/iconset/svg/icon_moon.svg",
    iconSize: 32,
    // Methods / Properties
    setTheme: this.setTheme.bind(this),
    selectTheme: this.selectTheme.bind(this),
    toggleTheme: this.toggleTheme.bind(this),
    selected: undefined,
    choices: themeChoices,
  };

  constructor() {
    super();
    this.theme = ThemeService.getSingleton();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5ThemeButtonComponent.observedAttributes);
    this.addEventListeners();
    this.initTheme();
  }

  protected addEventListeners() {
    this.theme.onChange((data) => {
      this.onChange(data);
    });
  }

  protected onChange(data: ThemeChangedData) {
    this.scope.selected = data.newValue.choice;
  }

  protected async beforeBind() {
    this.initTheme();
  }

  initTheme() {
    const selectEl = this.getElementsByTagName("select")?.item(0);
    const data = this.theme.init();
    this.scope.selected = data.choice || undefined;
    if (selectEl) this.theme.select(this.scope.selected, selectEl);
  }

  public setTheme(theme: ThemeChoice) {
    this.theme.set(theme);
  }

  /**
   * Used in `dropdown` mode (which uses a select element)
   */
  public selectTheme() {
    if (this.scope.selected) this.theme.set(this.scope.selected);
  }

  /**
   * Used in `icon` mode (which uses a button element)
   */
  public toggleTheme() {
    const current = this.theme.get();
    if (current.isDark) {
      if (current.supported && current.systemIsLight) {
        this.theme.set("os");
      } else {
        this.theme.set("light");
      }
    } else {
      if (current.supported && current.systemIsDark) {
        this.theme.set("os");
      } else {
        this.theme.set("dark");
      }
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return template(this.scope);
    } else {
      return null;
    }
  }
}
