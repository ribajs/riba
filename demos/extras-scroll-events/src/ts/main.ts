import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { extrasScrollEventsModule } from "./extras-scroll-events.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(extrasModule.init());
riba.module.regist(extrasScrollEventsModule.init());

riba.bind(document.body, model);
