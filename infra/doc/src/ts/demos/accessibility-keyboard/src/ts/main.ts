import { coreModule, Riba } from "@ribajs/core";
import { accessibilityModule } from "@ribajs/accessibility/src/index.js";
import { AccessibilityKeyboardDemoModule } from "./accessibility-keyboard-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(accessibilityModule.init());
riba.module.register(AccessibilityKeyboardDemoModule.init());

// Bind Riba
riba.bind(document.body, model);
