import { Component } from "@ribajs/core";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";

import iconArrowCarrot from "@ribajs/iconset/dist/svg/arrow_carrot.svg?url";
import iconCircleEmpty from "@ribajs/iconset/dist/svg/icon_circle-empty.svg?url";
import iconCircleSelected from "@ribajs/iconset/dist/svg/icon_circle-selected.svg?url";

export class SliderExampleComponent extends Component {
  public static tagName = "rv-slider-example";

  protected autobind = true;

  static get observedAttributes(): string[] {
    return [];
  }

  public scope = {
    iconArrowCarrot,
    iconCircleEmpty,
    iconCircleSelected,
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(SliderExampleComponent.observedAttributes);
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected async template() {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      const { default: template } = await import(
        "./slider-example.component.html?raw"
      );
      return template;
    }
  }
}
