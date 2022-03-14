import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core/src/index.js";
import { Bs4TabsTplModule } from "./bs4-tabs-tpl.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(bs4Module.init());
riba.module.regist(Bs4TabsTplModule.init());

const bindToElement = document.getElementById("rv-bs4-tabs-tpl");
if (!bindToElement) {
  throw new Error("Element to bind not found!");
}
riba.bind(bindToElement, model);
