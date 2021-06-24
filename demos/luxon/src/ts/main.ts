import { coreModule, Riba } from "@ribajs/core";
import { luxonModule } from "@ribajs/luxon";
import { LuxonDemoModule } from "./luxon-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(luxonModule);
riba.module.regist(LuxonDemoModule);

riba.bind(document.body, model);
