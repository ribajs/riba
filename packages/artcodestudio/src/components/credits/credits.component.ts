import { Component } from "@ribajs/core";
import { CreditsComponentScope } from "../../types/index.js";
import { hasChildNodesTrim } from "@ribajs/utils";

export class ArtCodeCreditsComponent extends Component {
  public static tagName = "ac-credits";

  autobind = true;

  static get observedAttributes() {
    return ["align", "icon-src"];
  }

  protected requiredAttributes() {
    return [];
  }

  public scope: CreditsComponentScope = {
    popupVisible: false,
    toggle: this.toggle,
    align: "top",
    iconSrc: "images/pixelherz.svg",
  };

  constructor() {
    super();
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(ArtCodeCreditsComponent.observedAttributes);
  }

  protected async init(observedAttributes: string[]) {
    return super.init(observedAttributes).then((view) => {
      return view;
    });
  }

  protected async afterBind() {
    await super.afterBind();
    document.addEventListener("click", this.onClickOutside);
  }

  protected _onClickOutside(event: MouseEvent) {
    if (event.target && !this.contains(event.target as Node)) {
      this.scope.popupVisible = false;
    }
  }

  protected onClickOutside = this._onClickOutside.bind(this);

  public toggle() {
    this.scope.popupVisible = !this.scope.popupVisible;
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
  }

  protected async template() {
    if (!hasChildNodesTrim(this)) {
      const { default: template } = await import("./credits.component.pug");
      return template(this.scope);
    } else {
      return null;
    }
  }
}
