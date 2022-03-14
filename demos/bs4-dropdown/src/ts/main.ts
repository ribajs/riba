import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core/src/index.js";
import { Bs4DropdownModule } from "./bs4-dropdown.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(bs4Module.init());
riba.module.regist(Bs4DropdownModule.init());

riba.bind(document.body, model);

console.log("bound");
