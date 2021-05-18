import { fabricjsModule } from "@ribajs/fabricjs";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { bs5Module } from "@ribajs/bs5";
import { FabricJSDemoModule } from "./fabricjs-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(extrasModule);
riba.module.regist(bs5Module);
riba.module.regist(fabricjsModule);
riba.module.regist(FabricJSDemoModule);

riba.bind(document.body, model);
