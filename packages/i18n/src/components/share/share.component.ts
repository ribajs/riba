import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import {
  Bs5ShareComponent,
  Scope as Bs5ShareScope,
} from "@ribajs/bs5/src/components/bs5-share/bs5-share.component.js";
import labelTemplate from "./share.label.html?raw";
import { I18nService } from "../../services/i18n.service.js";
import type { LocalesService } from "../../services/locales.service.js";

import template from "@ribajs/bs5/src/components/bs5-share/bs5-share.component.html?raw";

interface Scope extends Bs5ShareScope {
  textI18n?: string;
  labelI18n?: string;
  serviceLabelI18n?: string;
}

// interface NavigatorShareParam extends ShareData {
//   url: string;
//   text: string;
//   title: string;
// }

declare global {
  interface Navigator {
    share: (data?: ShareData) => Promise<void>;
  }
}

/**
 * Component to share the a link (i18n version)
 */
export class I18nShareComponent extends Bs5ShareComponent {
  public static tagName = "i18n-share";

  public _debug = false;

  public scope: Scope;

  static get observedAttributes(): string[] {
    return [
      ...Bs5ShareComponent.observedAttributes,
      "text-i18n",
      "label-i18n",
      "service-label-i18n",
    ];
  }

  protected localesService?: LocalesService;

  constructor() {
    super();
    this.scope = this.getScopeDefaults();
    this.scope.labelTemplate = labelTemplate;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs5ShareComponent.observedAttributes);
    this.addEventListeners();
  }

  protected getScopeDefaults(): Scope {
    const defaults = super.getScopeDefaults();
    return {
      ...defaults,
      textI18n: "",
      labelI18n: "",
      serviceLabelI18n: "",
    };
  }

  protected sourceText?: string;
  protected sourceLabels: Record<string, string> = {};
  protected unsubscribes: Array<() => void> = [];

  /** Translate the text and the service labels, a missing key keeps the source */
  protected translateScope = () => {
    const service = this.localesService;
    if (!service?.ready) {
      return;
    }
    if (this.scope.textI18n) {
      this.scope.text =
        service.lookup(this.scope.textI18n) ?? this.sourceText ?? "";
    }
    if (this.scope.serviceLabelI18n) {
      for (const shareItem of this.scope.shareItems) {
        shareItem.label =
          service.lookup(this.scope.serviceLabelI18n + "." + shareItem.id) ??
          this.sourceLabels[shareItem.id];
      }
    }
  };

  protected disconnectedCallback() {
    this.unsubscribes.forEach((unsubscribe) => unsubscribe());
    this.unsubscribes = [];
    super.disconnectedCallback();
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.localesService = I18nService.getLocalesService();
    this.sourceText = this.scope.text;
    for (const shareItem of this.scope.shareItems) {
      this.sourceLabels[shareItem.id] = shareItem.label;
    }
    this.unsubscribes.push(
      this.localesService.on("ready", this.translateScope),
      this.localesService.on("changed", this.translateScope),
    );
    this.translateScope();
  }

  protected async afterBind() {
    await super.afterBind();
  }

  protected async template() {
    this.debug("template", this, hasChildNodesTrim(this));
    if (this && hasChildNodesTrim(this)) {
      // If a child is set, this is a custom label template
      this.scope.labelTemplate = this.innerHTML;
      this.debug("Custom label template: ", this.scope.labelTemplate);
    }

    return template;
  }
}
