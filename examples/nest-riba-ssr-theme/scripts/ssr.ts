// import "@ribajs/ssr/src/polyfills";
import { SSRModule } from "@ribajs/ssr";
import { Riba, View, coreModule } from "@ribajs/core";
// import { ready } from "@ribajs/utils/src/dom";
// import { i18nModule, LocalesStaticService } from "@ribajs/i18n";

// Own
import * as pageComponents from "./pages";
import * as binders from "./binders";
import * as formatters from "./formatters";
// TODO import locales from "../locales";

declare global {
  interface Window {
    model: any;
    riba: Riba;
    view: View;
  }
}

window.model = window.model || {};
window.riba = new Riba();

// Regist custom components
window.riba.module.regist({
  components: pageComponents,
  binders,
  formatters,
});

// Regist modules
window.riba.module.regist(coreModule);
// this.riba.module.regist(i18nModule(this.localesService));
window.riba.module.regist(SSRModule);

console.log("Hello from Riba");

window.view = window.riba.bind(document.body, window.model);

// WORKAROUND / FIXME view.traverse method seems not to be working in jsdom / happy-dom
window.view.registComponents();

document.body.setAttribute("works", ":)");

console.log("Bind done");
