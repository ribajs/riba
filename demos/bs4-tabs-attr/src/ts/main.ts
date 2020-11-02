import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { Bs4TabsAttrModule } from "./bs4-tabs-attr.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs4Module);
riba.module.regist(Bs4TabsAttrModule);

riba.bind(document.body, model);
