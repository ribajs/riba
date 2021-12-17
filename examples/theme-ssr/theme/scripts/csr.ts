import { Riba, View, coreModule } from "@ribajs/core";
import { ready } from "@ribajs/utils/src/dom";
import { routerModule } from "@ribajs/router";
import { i18nModule, LocalesStaticService } from "@ribajs/i18n";
import { bs5Module } from "@ribajs/bs5";

// Own
import * as components from "./components";
import * as binders from "./binders";
import * as formatters from "./formatters";
import locales from "./locales";

export class CSRApp {
  protected view?: View;
  protected riba = new Riba();
  protected model: any = {};

  protected localesService = new LocalesStaticService(
    locales,
    undefined,
    false
  );

  constructor() {
    console.debug("init the main application");

    this.riba.configure({
      prefix: ["rv", "csr-rv"],
      blockUnknownCustomElements: false,
      templateDelimiters: ["[", "]"],
    });

    // Regist custom components
    this.riba.module.component.regists(components);
    this.riba.module.binder.regists(binders);
    this.riba.module.formatter.regists(formatters);

    // Regist modules
    this.riba.module.regist(coreModule.init());
    this.riba.module.regist(routerModule.init());
    this.riba.module.regist(
      i18nModule.init({ localesService: this.localesService })
    );
    this.riba.module.regist(bs5Module.init());

    this.riba.lifecycle.events.on(
      "ComponentLifecycle:error",
      (error: Error) => {
        console.error(error);
      }
    );

    this.view = this.riba.bind(document.body, this.model);
  }
}

ready(() => {
  new CSRApp();
});
