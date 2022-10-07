import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { Bs4ToastModule } from "./bs4-toast.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(bs4Module.init());
riba.module.register(extrasModule.init());
riba.module.register(Bs4ToastModule.init());

riba.bind(document.body, model);
