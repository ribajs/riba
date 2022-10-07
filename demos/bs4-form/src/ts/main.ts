import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { FormModule } from "./form.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(bs4Module.init());
riba.module.register(extrasModule.init());
riba.module.register(FormModule.init());

riba.bind(document.body, model);
