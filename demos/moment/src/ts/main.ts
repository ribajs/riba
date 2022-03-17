import { coreModule, Riba } from "@ribajs/core";
import { momentModule } from "@ribajs/moment";
import { MomentDemoModule } from "./moment-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(momentModule.init());
riba.module.regist(MomentDemoModule.init());

riba.bind(document.body, model);
