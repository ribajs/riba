import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core/src/index.js";
import { extrasModule } from "@ribajs/extras";
import { VideoDemoModule } from "./video-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(bs5Module.init());
riba.module.regist(extrasModule.init());
riba.module.regist(VideoDemoModule.init());

riba.bind(document.body, model);
