import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { photoswipeModule } from "@ribajs/photoswipe";
import { PhotoswipeDemoModule } from "./photoswipe-demo.module.js";

const riba = new Riba();
riba.configure({});
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(bs4Module.init());
riba.module.register(extrasModule.init());
riba.module.register(photoswipeModule.init());
riba.module.register(PhotoswipeDemoModule.init());

riba.bind(document.body, model);
