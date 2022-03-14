import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core/src/index.js";
import { extrasModule } from "@ribajs/extras";
import { photoswipeModule } from "@ribajs/photoswipe";
import { PhotoswipeDemoModule } from "./photoswipe-demo.module";

const riba = new Riba();
riba.configure({});
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(bs4Module.init());
riba.module.regist(extrasModule.init());
riba.module.regist(photoswipeModule.init());
riba.module.regist(PhotoswipeDemoModule.init());

riba.bind(document.body, model);
