import { coreModule, Riba } from "@ribajs/core/src/index.js";
import { extrasModule } from "@ribajs/extras";
import { touchEventsModule } from "./touch-events.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(extrasModule.init());
riba.module.regist(touchEventsModule.init());

riba.bind(document.body, model);
