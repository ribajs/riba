import { Component, TemplateFunction } from "@ribajs/core";
import { initTheme, setTheme } from "../../services/theme";
import { hasChildNodesTrim } from "@ribajs/utils";
import template from "./bs5-theme-button.component.pug";
import { themeChoices } from "../../constants";

import type { Bs5ThemeButtonComponentScope, ThemeChoice } from "../../types";

/**
 * @see https://github.com/TypeStrong/typedoc/blob/master/src/lib/output/themes/default/assets/typedoc/Theme.ts
 */
export class Bs5ThemeButtonComponent extends Component {
  public static tagName = "bs5-theme-button";

  static get observedAttributes() {
    return [];
  }

  public scope: Bs5ThemeButtonComponentScope = {
    setTheme: this.setTheme.bind(this),
    selectTheme: this.selectTheme.bind(this),
    selected: undefined,
    choices: themeChoices,
    labels: {
      "theme-os": "OS",
      "theme-light": "Light",
      "theme-dark": "Dark",
    },
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5ThemeButtonComponent.observedAttributes);
    this.initTheme();
  }

  protected async beforeBind() {
    this.initTheme();
  }

  initTheme() {
    const selectEl = this.getElementsByTagName("select")?.item(0);
    this.scope.selected = initTheme(selectEl) || undefined;
  }

  public setTheme(theme: ThemeChoice) {
    setTheme(theme);
  }

  public selectTheme() {
    if (this.scope.selected) setTheme(this.scope.selected);
  }

  protected template(): ReturnType<TemplateFunction> {
    if (!hasChildNodesTrim(this)) {
      return template(this.scope);
    } else {
      return null;
    }
  }
}
