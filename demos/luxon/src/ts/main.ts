import { coreModule, Riba } from "@ribajs/core";
import { luxonModule } from "@ribajs/luxon";
import { LuxonDemoModule } from "./luxon-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(luxonModule.init());
riba.module.regist(LuxonDemoModule.init());

riba.bind(document.body, model);
