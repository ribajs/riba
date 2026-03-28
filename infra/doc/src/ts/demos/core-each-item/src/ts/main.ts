import { Riba, coreModule } from "@ribajs/core";
import { eachItemModule } from "./each-item.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(eachItemModule.init());

const bindToElement = document.getElementById("rv-app");
if (!bindToElement) {
  throw new Error("Element with id 'rv-app' not found to bind riba on!");
}
riba.bind(bindToElement, model);
