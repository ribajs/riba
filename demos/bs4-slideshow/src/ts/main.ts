import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { Bs4SlideshowComponent } from "@ribajs/bs4/src/components/bs4-slideshow/bs4-slideshow.component.js";
import { Bs4IconComponent } from "@ribajs/bs4/src/components/bs4-icon/bs4-icon.component.js";
import { SlideshowDemoModule } from "./slideshow.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(extrasModule.init());
riba.module.register(SlideshowDemoModule.init());
riba.module.component.regists([Bs4SlideshowComponent, Bs4IconComponent]);

riba.bind(document.body, model);
