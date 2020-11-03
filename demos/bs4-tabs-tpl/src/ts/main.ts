import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { Bs4TabsTplModule } from "./bs4-tabs-tpl.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs4Module);
riba.module.regist(Bs4TabsTplModule);

const bindToElement = document.getElementById("rv-bs4-tabs-tpl");
if (!bindToElement) {
  throw new Error("Element to bind not found!");
}
riba.bind(bindToElement, model);
