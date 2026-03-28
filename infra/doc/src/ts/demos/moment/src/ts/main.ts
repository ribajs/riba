import { coreModule, Riba } from "@ribajs/core";
import { momentModule } from "@ribajs/moment";
import { MomentDemoModule } from "./moment-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(momentModule.init());
riba.module.register(MomentDemoModule.init());

riba.bind(document.body, model);
