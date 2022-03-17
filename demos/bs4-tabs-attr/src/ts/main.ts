import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { Bs4TabsAttrModule } from "./bs4-tabs-attr.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(bs4Module.init());
riba.module.regist(Bs4TabsAttrModule.init());

riba.bind(document.body, model);
