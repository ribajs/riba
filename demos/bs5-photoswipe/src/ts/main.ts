import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core/src/index.js";
import { extrasModule } from "@ribajs/extras";
import { bs5PhotoswipeModule } from "@ribajs/bs5-photoswipe";
import { masonryModule } from "@ribajs/masonry";
import { PhotoswipeDemoModule } from "./photoswipe-demo.module";

const riba = new Riba();
riba.configure({});
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(bs5Module.init());
riba.module.regist(extrasModule.init());
riba.module.regist(bs5PhotoswipeModule.init());
riba.module.regist(masonryModule.init());
riba.module.regist(PhotoswipeDemoModule.init());

riba.bind(document.body, model);
