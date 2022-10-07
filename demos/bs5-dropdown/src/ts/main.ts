import { coreModule, Riba } from "@ribajs/core";
import { bs5Module } from "@ribajs/bs5";
import { fuseModule } from "@ribajs/fuse";
import { Bs5DropdownModule } from "./bs5-dropdown.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(bs5Module.init({}));
riba.module.register(fuseModule.init({}));
riba.module.register(Bs5DropdownModule.init());

riba.bind(document.body, model);

console.log("bound");
