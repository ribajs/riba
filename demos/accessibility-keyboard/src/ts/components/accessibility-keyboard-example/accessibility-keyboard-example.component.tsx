import { Component, TemplateFunction } from "@ribajs/core";
import { KeyboardKeysComponent, KeyboardService } from "@ribajs/accessibility";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import template from "./accessibility-keyboard-example.component.pug";

interface Scope {
  layouts: string[];
  activeLayout: string;
  selectedValue: string;
  setLayout: AccessibilityGamepadExampleComponent["setLayout"];
}

export class AccessibilityGamepadExampleComponent extends Component {
  public static tagName = "accessibility-keyboard-example";

  protected keyboardEl?: KeyboardKeysComponent;

  protected keyboard = KeyboardService.getSingleton();

  protected autobind = true;
  static get observedAttributes(): string[] {
    return [];
  }

  public scope: Scope = {
    layouts: [],
    activeLayout: "english",
    selectedValue: "english",
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
    this.keyboardEl =
      this.querySelector<KeyboardKeysComponent>(
        KeyboardKeysComponent.tagName
      ) || undefined;

    if (this.keyboardEl) {
      this.scope.layouts = Object.keys(this.keyboard.layouts);
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
