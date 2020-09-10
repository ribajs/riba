import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { momentModule } from "@ribajs/moment";
import { MomentDemoModule } from "./moment-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs4Module);
riba.module.regist(extrasModule);
riba.module.regist(momentModule);
riba.module.regist(MomentDemoModule);

riba.bind(document.body, model);
