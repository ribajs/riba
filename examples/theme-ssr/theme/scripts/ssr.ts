import "@ribajs/ssr/src/polyfills";
import { SSRModule } from "@ribajs/ssr";
import { Riba, coreModule } from "@ribajs/core";
// import { i18nModule, LocalesStaticService } from "@ribajs/i18n";

// Own
import * as pageComponents from "./pages";
import { LinkListComponent } from "./components/link-list/link-list.component";
import * as binders from "./binders";
import * as formatters from "./formatters";
// import locales from "./locales";

const riba = new Riba();

// These Riba settings are necessary for the ssr
riba.configure({
  prefix: ["rv", "ssr-rv"],
  blockUnknownCustomElements: false,
  templateDelimiters: ["[", "]"],
});

// Regist custom components
riba.module.component.regists({ ...pageComponents, LinkListComponent });
riba.module.binder.regists(binders);
riba.module.formatter.regists(formatters);

// const localesService = new LocalesStaticService(locales, undefined, false);
// riba.module.regist(i18nModule.init({ localesService }));

// Regist modules
riba.module.regist(coreModule.init());
riba.module.regist(SSRModule.init());

console.log("Hello from Riba");

riba.bind(document.body);
