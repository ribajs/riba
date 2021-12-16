import "@ribajs/ssr/src/polyfills";
import { SSRModule } from "@ribajs/ssr";
import { Riba, coreModule } from "@ribajs/core";

// Own
import { HelloSsrPageComponent } from "./pages/hello-ssr/hello-ssr.component";

const riba = new Riba();

// These Riba settings are necessary for the ssr
riba.configure({
  prefix: ["rv", "ssr-rv"],
  blockUnknownCustomElements: false,
  templateDelimiters: ["[", "]"],
});

// Regist custom components
riba.module.component.regist(HelloSsrPageComponent);

// Regist modules
riba.module.regist(coreModule.init({}));
riba.module.regist(SSRModule.init({}));

// After all components are bound wie trigger the ssr ready event,
// as soon as this event is triggered the ssr rendering will be done returns the rendered html
riba.lifecycle.events.on("ComponentLifecycle:allBound", () => {
  window.ssr.events.trigger("ready");
});

riba.lifecycle.events.on("ComponentLifecycle:error", (error: Error) => {
  window.ssr.events.trigger("error", error);
});

const view = riba.bind(document?.body);

// WORKAROUND / FIXME view.traverse method seems not to be working in jsdom
view.registComponents();
