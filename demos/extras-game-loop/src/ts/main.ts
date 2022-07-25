import { coreModule, Riba } from "@ribajs/core";

import { ExtrasGameLoopModule } from "./extras-game-loop.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(ExtrasGameLoopModule.init());

riba.bind(document.body, model);
