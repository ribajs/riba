import { coreModule, Riba } from "@ribajs/core";
import { LottieModule } from "@ribajs/lottie";
import { LottieDemoModule } from "./lottie-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(LottieModule.init());
riba.module.register(LottieDemoModule.init());

// Bind Riba
riba.bind(document.body, model);
