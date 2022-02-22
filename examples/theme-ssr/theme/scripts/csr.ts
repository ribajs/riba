import { Riba, coreModule } from "@ribajs/core";
import { ready } from "@ribajs/utils/src/dom";
import { routerModule } from "@ribajs/router";
import { i18nModule, LocalesStaticService } from "@ribajs/i18n";
import { bs5Module } from "@ribajs/bs5";

// Own
import * as components from "./components";
import * as binders from "./binders";
import * as formatters from "./formatters";
import locales from "./locales";

const bootstrap = () => {
  const riba = new Riba();
  const model: any = {};

  const localesService = new LocalesStaticService(locales, undefined, false);

  console.debug("init the main application");

  riba.configure({
    prefix: ["rv", "csr-rv"],
    blockUnknownCustomElements: false,
    templateDelimiters: ["{", "}"],
  });

  // Regist custom components
  riba.module.component.regists(components);
  riba.module.binder.regists(binders);
  riba.module.formatter.regists(formatters);

  // Regist modules
  riba.module.regist(coreModule.init());
  riba.module.regist(routerModule.init());
  riba.module.regist(i18nModule.init({ localesService: localesService }));
  riba.module.regist(bs5Module.init());

  riba.lifecycle.events.on("ComponentLifecycle:error", (error: Error) => {
    console.error(error);
  });

  riba.bind(document.body, model);
};

ready(bootstrap);
