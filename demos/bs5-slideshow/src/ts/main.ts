import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { bs5Module } from "@ribajs/bs5";
import { SlideshowDemoModule } from "./slideshow.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(extrasModule.init());
riba.module.register(bs5Module.init());
riba.module.register(SlideshowDemoModule.init());

riba.bind(document.body, model);
