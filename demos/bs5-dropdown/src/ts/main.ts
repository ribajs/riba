import { coreModule, Riba } from "@ribajs/core";
import { bs5Module } from "@ribajs/bs5";
import { fuseModule } from "@ribajs/fuse";
import { Bs5DropdownModule } from "./bs5-dropdown.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(bs5Module.init({}));
riba.module.regist(fuseModule.init({}));
riba.module.regist(Bs5DropdownModule.init());

riba.bind(document.body, model);

console.log("bound");
