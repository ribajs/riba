import { TemplateFunction } from "@ribajs/core/src/index.js";
import { hasChildNodesTrim } from "@ribajs/utils/src/dom.js";
import {
  Bs4ShareComponent,
  Scope as Bs4ShareScope
} from "@ribajs/bs4/src/components/bs4-share/bs4-share.component.js";
import template from "@ribajs/bs4/src/components/bs4-share/bs4-share.component.html";
import labelTemplate from "./share.label.html";
import { I18nService } from "../../services";
import { LocalesService } from "../../types/index.js";

interface Scope extends Bs4ShareScope {
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
export class I18nShareComponent extends Bs4ShareComponent {
  public static tagName = "i18n-share";

  public _debug = false;

  static get observedAttributes(): string[] {
    return [
      ...Bs4ShareComponent.observedAttributes,
      "text-i18n",
      "label-i18n",
      "service-label-i18n"
    ];
  }

  protected localesService?: LocalesService;

  public scope: Scope = super.scope;

  constructor() {
    super();
    this.scope = this.getScopeDefaults();
    this.scope.labelTemplate = labelTemplate;
  }

  protected connectedCallback() {
    super.connectedCallback();
    this.init(Bs4ShareComponent.observedAttributes);
    this.addEventListeners();
  }

  protected async initI18n() {
    return new Promise<string | undefined>((resolve) => {
      this.localesService?.event.on("changed", async (langcode: string) => {
        return resolve(langcode);
      });
      if (this.localesService?.ready) {
        const langcode = this.localesService?.getLangcode();
        return resolve(langcode);
      } else {
        this.localesService?.event.on("ready", async (langcode: string) => {
          return resolve(langcode);
        });
      }
    });
  }

  protected async i18n(langcode: string, value: string) {
    if (!value) {
      return;
    }

    return this.localesService
      ?.get([langcode, ...value.split(".")])
      .then((locale: string) => {
        // this.debug('changed local', local);
        return locale;
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }

  protected async beforeBind() {
    await super.beforeBind();
    this.localesService = I18nService.options.localesService;
    const langcode = await this.initI18n();

    if (this.scope.textI18n && langcode) {
      this.scope.text =
        (await this.i18n(langcode, this.scope.textI18n)) || this.scope.text;
    }

    if (this.scope.serviceLabelI18n && langcode) {
      for (const shareItem of this.scope.shareItems) {
        shareItem.label =
          (await this.i18n(
            langcode,
            this.scope.serviceLabelI18n + "." + shareItem.id
          )) || shareItem.label;
      }
    }
  }

  protected async afterBind() {
    await super.afterBind();
  }

  protected template(): ReturnType<TemplateFunction> {
    this.debug("template", this, hasChildNodesTrim(this));
    if (this && hasChildNodesTrim(this)) {
      // If a child is set, this is a custom label template
      this.scope.labelTemplate = this.innerHTML;
      this.debug("Custom label template: ", this.scope.labelTemplate);
    }
    return template;
  }
}
