import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { Bs4TabsTplModule } from "./bs4-tabs-tpl.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(bs4Module.init());
riba.module.register(Bs4TabsTplModule.init());

const bindToElement = document.getElementById("rv-bs4-tabs-tpl");
if (!bindToElement) {
  throw new Error("Element to bind not found!");
}
riba.bind(bindToElement, model);
