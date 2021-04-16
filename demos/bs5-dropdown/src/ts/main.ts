import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core";
import { Bs5DropdownModule } from "./bs5-dropdown.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs5Module({}));
riba.module.regist(Bs5DropdownModule);

riba.bind(document.body, model);

console.log("bound");
