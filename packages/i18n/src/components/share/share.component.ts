import { TypeOfComponent } from "@ribajs/core";
import {
  Bs4ShareComponent,
  Scope as Bs4ShareScope,
} from "@ribajs/bs4/src/components/bs4-share/bs4-share.component";
import template from "./share.component.html";
import { ALocalesService } from "../../services/locales-base.service";
// import { LocalesService } from "@ribajs/shopify-tda";

interface Scope extends Bs4ShareScope {
  textI18n?: string;
  labelI18n?: string;
}

interface NavigatorShareParam {
  url: string;
  text: string;
  title: string;
}

declare global {
  // tslint:disable: interface-name
  interface Navigator {
    share: (data: NavigatorShareParam) => Promise<any>;
  }
}

/**
 * Component to share the a link (i18n version)
 */
export const i18nShareComponentWrapper = (
  localesService: ALocalesService
): TypeOfComponent<any> => {
  return class I18nShareComponent extends Bs4ShareComponent {
    public static tagName = "i18n-share";

    static get observedAttributes() {
      return [
        ...Bs4ShareComponent.observedAttributes,
        "text-i18n",
        "label-i18n",
      ];
    }

    protected localesService: ALocalesService = localesService;

    protected scope: Scope = {
      title: document.title,
      text: "Look at this! 🤩", // 👀
      textI18n: undefined,
      url: window.location.href,
      label: "Share",
      labelI18n: undefined,
      share: this.share,
      isAndroid: navigator.userAgent.match(/Android/i) !== null,
      isIos: navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null,
      isDesktop: false,
      shareUrls: {},
      isNative: typeof navigator.share === "function",
    };

    constructor(element?: HTMLElement) {
      super(element);
    }

    protected initTranslate() {
      this.localesService.event.on("changed", (langcode: string) => {
        this.translate(langcode);
      });
      if (this.localesService.ready) {
        const langcode = this.localesService.getLangcode();
        if (langcode) {
          this.translate(langcode);
        }
      } else {
        this.localesService.event.on("ready", (langcode: string) => {
          this.translate(langcode);
        });
      }
    }

    protected translate(langcode: string) {
      if (!this.scope.textI18n) {
        return;
      }

      this.localesService
        .get([langcode, ...this.scope.textI18n.split(".")])
        .then((locale: string) => {
          // console.debug('changed local', local);
          this.scope.text = locale;
          return;
        })
        .catch((error: Error) => {
          console.error(error);
        });
    }

    protected async beforeBind() {
      // console.debug('beforeBind');
      await super.beforeBind();
      this.initTranslate();
    }

    protected async afterBind() {
      await super.afterBind();
    }

    // protected requiredAttributes() {
    //   return ["title", "text", "url", "label"];
    // }

    protected template() {
      if (this.el && this.el.hasChildNodes()) {
        return null;
      } else {
        return template;
      }
    }
  };
};
