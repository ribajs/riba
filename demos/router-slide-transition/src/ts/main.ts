import { Riba, coreModule } from "@ribajs/core";
import { routerModule } from "@ribajs/router";
import { createSlideTransitions } from "./transitions/factory.js";

const riba = new Riba();
const model = {};

riba.module.register(coreModule.init());
riba.module.register(
  routerModule.init({
    transitions: createSlideTransitions(),
  }),
);

riba.bind(document.body, model);
