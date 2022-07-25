import { coreModule, Riba } from "@ribajs/core";
import { LottieModule } from "@ribajs/lottie";
import { LottieDemoModule } from "./lottie-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(LottieModule.init());
riba.module.regist(LottieDemoModule.init());

// Bind Riba
riba.bind(document.body, model);
