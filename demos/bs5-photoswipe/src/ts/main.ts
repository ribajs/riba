import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { bs5PhotoswipeModule } from "@ribajs/bs5-photoswipe";
import { masonryModule } from "@ribajs/masonry";
import { PhotoswipeDemoModule } from "./photoswipe-demo.module.js";

const riba = new Riba();
riba.configure({});
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(bs5Module.init());
riba.module.register(extrasModule.init());
riba.module.register(bs5PhotoswipeModule.init());
riba.module.register(masonryModule.init());
riba.module.register(PhotoswipeDemoModule.init());

riba.bind(document.body, model);
