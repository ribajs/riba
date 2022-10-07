import { coreModule, Riba } from "@ribajs/core";
import { luxonModule } from "@ribajs/luxon";
import { LuxonDemoModule } from "./luxon-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(luxonModule.init());
riba.module.register(LuxonDemoModule.init());

riba.bind(document.body, model);
