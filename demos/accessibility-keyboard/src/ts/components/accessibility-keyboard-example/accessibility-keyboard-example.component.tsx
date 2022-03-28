import { Component, TemplateFunction } from "@ribajs/core";
import { KeyboardKeysComponent } from "@ribajs/accessibility";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import template from "./accessibility-keyboard-example.component.pug";

interface Scope {
  layouts: string[];
  activeLayout: string;
  setLayout: AccessibilityGamepadExampleComponent["setLayout"];
}

export class AccessibilityGamepadExampleComponent extends Component {
  public static tagName = "accessibility-keyboard-example";

  protected autobind = true;
  static get observedAttributes(): string[] {
    return [];
  }

  public scope: Scope = {
    layouts: [],
    activeLayout: "english",
    setLayout: this.setLayout,
  };

  constructor() {
    super();
  }

  public setLayout(layoutName: string) {
    console.debug("setLayout: " + layoutName);
    this.scope.activeLayout = layoutName;
  }

  protected connectedCallback() {
    super.connectedCallback();
    super.init(AccessibilityGamepadExampleComponent.observedAttributes);
  }

  protected async afterAllBind(): Promise<any> {
    super.afterAllBind();
    const keyboardKeysEl = this.querySelector<KeyboardKeysComponent>(
      KeyboardKeysComponent.tagName
    );

    if (keyboardKeysEl) {
      this.scope.layouts = Object.keys(keyboardKeysEl.layouts);
    }
  }

  protected template(): ReturnType<TemplateFunction> {
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      return null;
    } else {
      return template(this.scope);
    }
  }
}
