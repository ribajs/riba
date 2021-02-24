import "@ribajs/ssr/src/polyfills";
import { SSRModule } from "@ribajs/ssr";
import { Riba, View, coreModule } from "@ribajs/core";
// import { i18nModule, LocalesStaticService } from "@ribajs/i18n";
// import { ready } from "@ribajs/utils/src/dom";

// Own
import * as pageComponents from "./pages";
import { LinkListComponent } from "./components/link-list/link-list.component";
import * as binders from "./binders";
import * as formatters from "./formatters";
// import locales from "./locales";

declare global {
  interface Window {
    model: any;
    riba: Riba;
    view: View;
  }
}

window.model = window.model || window.ssr.templateVars || {};

const riba = new Riba();

// These Riba settings are necessary for the ssr
riba.configure({ prefix: "ssr-rv", blockUnknownCustomElements: false });

// Regist custom components
riba.module.regist({
  components: { ...pageComponents, LinkListComponent },
  binders,
  formatters,
});

// const localesService = new LocalesStaticService(locales, undefined, false);
// riba.module.regist(i18nModule(localesService));

// Regist modules
riba.module.regist(coreModule);
riba.module.regist(SSRModule);

console.log("Hello from Riba");

// After all components are bound wie trigger the ssr ready event,
// as soon as this event is triggered the ssr rendering will be done returns the rendered html
riba.lifecycle.events.on("ComponentLifecycle:allBound", () => {
  console.debug("ready!");
  window.ssr.events.trigger("ready");
});

const view = riba.bind(document.body, window.model);

// WORKAROUND / FIXME view.traverse method seems not to be working in jsdom
view.registComponents();
