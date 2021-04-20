import { bs5Module } from "@ribajs/bs5";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { contentSliderModule } from "@ribajs/content-slider";
import { ContentSliderDemoModule } from "./content-slider-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs5Module.init({}));
riba.module.regist(extrasModule);
riba.module.regist(contentSliderModule);
riba.module.regist(ContentSliderDemoModule);

riba.bind(document.body, model);
