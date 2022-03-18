import {
  Component,
  TemplateFunction,
  HttpService,
  ScopeBase
} from "@ribajs/core";
import Debug from "debug";
import pugTemplate from "./plans.component.pug";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import { RecurringCharge } from "../../interfaces/shopify-api/recurring_charge.js";
import { Plan } from "../../interfaces/plan.js";

interface Scope extends ScopeBase {
  plans: Plan[];
  active?: RecurringCharge;
  hasActive: boolean;
  activate: ShopifyNestPlansComponent["activate"];
}

export class ShopifyNestPlansComponent extends Component {
  public static tagName = "shopify-nest-plans";

  static get observedAttributes(): string[] {
    return [];
  }

  protected debug = Debug("component:" + ShopifyNestPlansComponent.tagName);

  public scope: Scope = {
    plans: [],
    active: undefined,
    hasActive: false,
    activate: this.activate
  };

  constructor() {
    super();
    this.debug("constructor", this);
  }

  protected connectedCallback() {
    super.connectedCallback();
    return this.init(ShopifyNestPlansComponent.observedAttributes);
  }

  /**
   * Create and acivate the charge
   * @param plan
   */
  public activate(plan: Plan) {
    this.debug("activate");
    const activateUrl = `/shopify/charge/create/${plan.name}`;
    window.location.href = activateUrl;
  }

  protected async loadActiveCharge() {
    return HttpService.getJSON<RecurringCharge | null>(
      `/shopify/charge/active`
    ).then((res) => {
      const activeCharge = res.body;
      this.debug("activeCharge", activeCharge);
      this.scope.active = activeCharge ? activeCharge : undefined;
      if (this.scope.active) {
        this.scope.hasActive = true;
      }
      return this.scope.active;
    });
  }

  protected async loadAvailableCharges() {
    return HttpService.getJSON<Plan[]>(`/shopify/charge/available`).then(
      (res) => {
        const availableCharges = res.body;
        this.debug("available charges", availableCharges);
        this.scope.plans = availableCharges;
        return this.scope.plans;
      }
    );
  }

  protected async beforeBind() {
    this.debug("beforeBind");
    await super.beforeBind();
    try {
      await this.loadAvailableCharges();
      await this.loadActiveCharge();
    } catch (error) {
      this.debug("error", error);
    }
  }

  protected async afterBind() {
    this.debug("afterBind", this.scope);
    await super.afterBind();
  }

  protected requiredAttributes(): string[] {
    return [];
  }

  protected disconnectedCallback() {
    super.disconnectedCallback();
  }

  protected template(): ReturnType<TemplateFunction> {
    let template: string | null = null;
    // Only set the component template if there no childs already
    if (hasChildNodesTrim(this)) {
      this.debug("Do not template, because element has child nodes");
      return template;
    } else {
      template = pugTemplate(this.scope);
      this.debug("Use template", template);
      return template;
    }
  }
}
