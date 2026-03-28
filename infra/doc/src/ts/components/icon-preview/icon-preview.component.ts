import { Component, ScopeBase } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { escapeHtml } from "@ribajs/utils/src/type.js";

import template from "./icon-preview.component.html?raw";

import * as Prism from "prismjs";

interface Scope extends ScopeBase {
  assetPath: string;
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
    return ["asset-path"];
  }

  public scope: Scope = {
    assetPath: "",
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
    example: "string",
  };

  constructor() {
    super();
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get("name");
    if (!name) {
      throw new Error('Query url parameter "name" is required!');
    }
    this.scope.name = name;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(IconPreviewComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes);
  }

  protected async afterBind() {
    Prism.highlightAll();
    await super.afterBind();
  }

  protected parsedAttributeChangedCallback(
    attributeName: string,
    oldValue: any,
    newValue: any,
    namespace: string | null,
  ) {
    super.parsedAttributeChangedCallback(
      attributeName,
      oldValue,
      newValue,
      namespace,
    );
    if (attributeName === "assetPath") {
      const urlParts = this.scope.assetPath.split("?");
      this.scope.assetPath = urlParts[0];
      const cacheQueryParam = urlParts[1];
      this.scope.src = this.scope.assetPath +=
        "iconset_" + this.scope.name + ".svg?" + cacheQueryParam;

      this.scope.example = escapeHtml(
        `
        <bs4-icon color="danger" src="/assets/${
          this.scope.name + ".svg"
        }" size="32" direction="up"></bs4-icon>
      `.trim(),
      );
    }
  }

  protected requiredAttributes() {
    return ["assetPath", "src"];
  }

  protected template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
