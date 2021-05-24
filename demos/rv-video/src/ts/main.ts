import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { VideoDemoModule } from "./video-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs5Module.init());
riba.module.regist(extrasModule);
riba.module.regist(VideoDemoModule);

riba.bind(document.body, model);
