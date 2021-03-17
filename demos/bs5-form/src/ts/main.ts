import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { FormModule } from "./form.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs5Module);
riba.module.regist(extrasModule);
riba.module.regist(FormModule);

riba.bind(document.body, model);
