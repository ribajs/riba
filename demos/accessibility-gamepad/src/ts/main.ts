import { coreModule, Riba } from "@ribajs/core/src/index.js";
import { accessibilityModule } from "@ribajs/accessibility/src/index.js";
import { AccessibilityGamepadDemoModule } from "./accessibility-gamepad-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(accessibilityModule.init());
riba.module.regist(AccessibilityGamepadDemoModule.init());

// Bind Riba
riba.bind(document.body, model);
