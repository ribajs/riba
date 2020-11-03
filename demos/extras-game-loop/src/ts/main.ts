import { coreModule, Riba } from "@ribajs/core";

import { ExtrasGameLoopModule } from "./extras-game-loop.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(ExtrasGameLoopModule);

riba.bind(document.body, model);
