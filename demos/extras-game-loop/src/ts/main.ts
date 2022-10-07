import { coreModule, Riba } from "@ribajs/core";

import { ExtrasGameLoopModule } from "./extras-game-loop.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(ExtrasGameLoopModule.init());

riba.bind(document.body, model);
