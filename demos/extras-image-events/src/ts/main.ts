import "@ribajs/types";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import ImageEventsDemoModule from "./image-events.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(extrasModule.init());
riba.module.register(ImageEventsDemoModule.init());

riba.bind(document.body, model);
