import {
  Bs4ContentsComponent,
  Scope as Bs4ContentsComponentScope,
} from "../bs4-contents/bs4-contents.component.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { TemplateFunction } from "@ribajs/core/src/index.js";
import template from "./bs4-scrollspy.component.html";

export interface Anchor {
  element: HTMLHeadingElement;
  href: string;
  title: string;
  childs: Anchor[];
}

export interface Scope extends Bs4ContentsComponentScope {
  /**
   * Pixels to offset from top when calculating position of scroll.
   */
  offset: number;
  /**
   * Pixels to offset from bottom when calculating position of scroll.
   */
  offsetBottom: number;
}

export class Bs4ScrollspyComponent extends Bs4ContentsComponent {
  public static tagName = "bs4-scrollspy";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [
      "headers-start",
      "headers-depth",
      "find-header-id-depth",
      "header-parent-selector",
      "offset",
      "offset-bottom",
      "scroll-offset",
    ];
  }

  public scope: Scope = {
    headersDepth: 1,
    headersStart: 2,
    findHeaderIdDepth: 1,
    headerParentSelector: undefined,
    offset: 0,
    offsetBottom: 0,
    scrollOffset: 0,
    anchors: [],
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ScrollspyComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return ["headersStart", "headersDepth", "headerParentSelector"];
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template;
    }
  }
}
