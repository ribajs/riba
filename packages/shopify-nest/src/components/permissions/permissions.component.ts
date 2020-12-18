import { Component } from "@ribajs/core";
import { getElementFromEvent, hasChildNodesTrim } from "@ribajs/utils/src/dom";
import Debug from "debug";
import { ACCESS_SCOPES } from "../../constants";
import pugTemplate from "./permissions.component.pug";

interface AccessScopeItem {
  value: string;
  action: "write" | "read";
  checked: boolean;
}

interface AccessScopes {
  [groupKey: string]: {
    items: AccessScopeItem[];
    // placeholder
    info: any;
  };
}

interface Scope {
  accessScopes: AccessScopes;
  toggleAll: ShopifyNestPermissionsComponent["toggleAll"];
}

export class ShopifyNestPermissionsComponent extends Component {
  public static tagName = "shopify-nest-permissions";

  static get observedAttributes() {
    return [];
  }

  protected debug = Debug(
    "component:" + ShopifyNestPermissionsComponent.tagName
  );

  protected scope: Scope = {
    accessScopes: {},
    toggleAll: this.toggleAll,
  };

  constructor(element?: HTMLElement) {
    super(element);
    this.debug("constructor", this);
    this.debug(this.scope.accessScopes);
  }

  public toggleAll(event: Event) {
    const el = getElementFromEvent<HTMLInputElement>(event);
    const checked = el.checked;
    for (const key in this.scope.accessScopes) {
      if (Object.prototype.hasOwnProperty.call(this.scope.accessScopes, key)) {
        const accessScopeObj = this.scope.accessScopes[key];
        for (const accessScope of accessScopeObj.items) {
          accessScope.checked = checked;
        }
      }
    }
  }

  protected groupAccessScopes() {
    for (const ACCESS_SCOPE of ACCESS_SCOPES) {
      const groupKey = ACCESS_SCOPE.replace(/^(read_|write_)/i, "");
      this.scope.accessScopes[groupKey] = this.scope.accessScopes[groupKey] || {
        items: [],
        i18n: {
          desc: `shopify.accessScopes.${groupKey}`,
        },
      };

      if (ACCESS_SCOPE.endsWith(groupKey)) {
        this.scope.accessScopes[groupKey].items.push({
          value: ACCESS_SCOPE,
          action: ACCESS_SCOPE.replace("_" + groupKey, "") as "read" | "write",
          checked: false,
        });
      }
    }
  }

  protected connectedCallback() {
    super.connectedCallback();
    return this.init(ShopifyNestPermissionsComponent.observedAttributes);
  }

  protected async beforeBind() {
    this.debug("beforeBind");
    await super.beforeBind();
    this.groupAccessScopes();
  }

  protected async afterBind() {
    await super.afterBind();
    this.debug("afterBind", this.scope);
  }

  protected requiredAttributes() {
    return [];
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template() {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this.el)) {
      this.debug("Do not template, because element has child nodes");
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug("Use template", template);
      return template;
    }
  }
}
