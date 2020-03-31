import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { photoswipeModule } from "@ribajs/photoswipe";
import { PhotoswipeDemoModule } from "./photoswipe-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs4Module);
riba.module.regist(extrasModule);
riba.module.regist(photoswipeModule);
riba.module.regist(PhotoswipeDemoModule);

riba.bind(document.body, model);
