import { Riba, View, coreModule } from "@ribajs/core";
import { ready } from "@ribajs/utils/src/dom";
import { routerModule } from "@ribajs/router";
import { i18nModule, LocalesStaticService } from "@ribajs/i18n";
import { bs4Module } from "@ribajs/bs4";

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

    // Regist custom components
    this.riba.module.regist({
      components,
      binders,
      formatters,
    });

    // Regist modules
    this.riba.module.regist(coreModule);
    this.riba.module.regist(routerModule);
    this.riba.module.regist(i18nModule(this.localesService));
    this.riba.module.regist(bs4Module);

    this.view = this.riba.bind(document.body, this.model);
  }
}

ready(() => {
  new CSRApp();
});
