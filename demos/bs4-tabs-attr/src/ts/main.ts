import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { Bs4TabsAttrModule } from "./bs4-tabs-attr.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(bs4Module.init());
riba.module.register(Bs4TabsAttrModule.init());

riba.bind(document.body, model);
