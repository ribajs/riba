import { Riba, coreModule } from "@ribajs/core";
import { componentsModule } from "./components.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(componentsModule.init());

const bindToElement = document.getElementById("rv-app");
if (!bindToElement) {
  throw new Error("Element with id 'rv-app' not found to bind riba on!");
}
riba.bind(bindToElement, model);
