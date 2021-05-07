import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { bs5PhotoswipeModule } from "@ribajs/bs5-photoswipe";
import { PhotoswipeDemoModule } from "./photoswipe-demo.module";

const riba = new Riba();
riba.configure({});
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs5Module.init());
riba.module.regist(extrasModule);
riba.module.regist(bs5PhotoswipeModule);
riba.module.regist(PhotoswipeDemoModule);

riba.bind(document.body, model);
