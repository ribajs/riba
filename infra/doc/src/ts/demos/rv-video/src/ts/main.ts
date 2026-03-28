import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { VideoComponent } from "@ribajs/extras/src/components/index.js";
import { VideoDemoModule } from "./video-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(bs5Module.init());
riba.module.register(extrasModule.init());
riba.module.component.register(VideoComponent);
riba.module.register(VideoDemoModule.init());

riba.bind(document.body, model);
