import { Component, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

import template from "./icon-preview.component.html?raw";

import * as Prism from "prismjs";

interface Scope extends ScopeBase {
  hasName: boolean;
  name: string;
  src: string;
  sizes: number[];
  colors: Array<string | string[]>;
  directions: string[];
  example: string;
}

export class IconPreviewComponent extends Component {
  public static tagName = "rv-icon-preview";

  protected autobind = true;

  static get observedAttributes() {
    return [];
  }

  public scope: Scope = {
    hasName: false,
    name: "",
    src: "",
    sizes: [96, 88, 80, 72, 64, 56, 48, 40, 32, 24, 16, 8],
    colors: [
      "black",
      "white",
      "primary",
      "success",
      "info",
      "warning",
      "danger",
      ["stroke-black", "white"],
      ["stroke-white", "black"],
      ["stroke-primary", "white"],
      ["stroke-success", "white"],
      ["stroke-info", "white"],
      ["stroke-warning", "white"],
      ["stroke-danger", "white"],
    ],
    directions: [
      "left",
      "left-up",
      "up",
      "up-right",
      "right",
      "right-down",
      "down",
      "down-left",
    ],
    example: "",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(IconPreviewComponent.observedAttributes);
  }

  protected async beforeBind() {
    this.syncIconFromLocation();
    await super.beforeBind();
  }

  protected async afterBind() {
    await super.afterBind();
    const codeEl = this.querySelector(
      "#example code.language-html",
    ) as HTMLElement | null;
    if (codeEl && this.scope.example) {
      codeEl.textContent = this.scope.example;
    }
    Prism.highlightAll();
  }

  /** Read ?name= from the URL right before the inner view binds (SPA-safe). */
  private syncIconFromLocation() {
    const name = new URLSearchParams(window.location.search).get("name")?.trim();
    if (name) {
      this.setIconName(name);
    }
  }

  protected requiredAttributes() {
    return [];
  }

  protected template() {
    // Only set the component template if there are no child nodes yet.
    return hasChildNodesTrim(this) ? null : template;
  }

  private setIconName(name: string) {
    this.scope.hasName = true;
    this.scope.name = name;
    this.scope.src = `./iconset/${name}.svg`;
    this.scope.example = `<bs5-icon color="danger" src="./iconset/${name}.svg" size="32" direction="up"></bs5-icon>`;
  }
}
