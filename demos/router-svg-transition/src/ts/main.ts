import { Riba, coreModule } from "@ribajs/core";
import { routerModule } from "@ribajs/router";
import { createSvgTransitions } from "./transitions/factory.js";

const riba = new Riba();
const model = {};
riba.module.register(coreModule.init());
riba.module.register(
  routerModule.init({
    transitions: createSvgTransitions({
      namePrefix: "svg",
      homeNamespace: "home",
      pageNamespace: "detail",
    }),
  }),
);

routerModule.hooks.before(() => {
  document.querySelector("router-view")?.classList.add("is-animating");
});
routerModule.hooks.after(() => {
  document.querySelector("router-view")?.classList.remove("is-animating");
});

riba.bind(document.body, model);
