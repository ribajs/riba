import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { twModule } from "@ribajs/tw";
import { SlideshowDemoModule } from "./slideshow.module.js";

const riba = new Riba();
const model = {};

riba.module.register(coreModule.init());
riba.module.register(extrasModule.init());
riba.module.register(twModule.init());
riba.module.register(SlideshowDemoModule.init());

riba.bind(document.body, model);
