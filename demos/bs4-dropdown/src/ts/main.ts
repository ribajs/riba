import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { Bs4DropdownModule } from "./bs4-dropdown.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(bs4Module.init());
riba.module.register(Bs4DropdownModule.init());

riba.bind(document.body, model);

console.log("bound");
