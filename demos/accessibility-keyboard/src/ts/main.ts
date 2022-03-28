import { coreModule, Riba } from "@ribajs/core";
import { accessibilityModule } from "@ribajs/accessibility/src/index.js";
import { AccessibilityKeyboardDemoModule } from "./accessibility-keyboard-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(accessibilityModule.init());
riba.module.regist(AccessibilityKeyboardDemoModule.init());

// Bind Riba
riba.bind(document.body, model);
