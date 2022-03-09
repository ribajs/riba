import { Riba, coreModule } from "@ribajs/core/src/index.js";
import { vueExampleModule } from "./vue-example.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(vueExampleModule.init());

const bindToElement = document.getElementById("rv-app");
if (!bindToElement) {
  throw new Error("Element with id 'rv-app' not found to bind riba on!");
}
riba.bind(bindToElement, model);
