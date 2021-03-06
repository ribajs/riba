import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { Bs4SlideshowComponent } from "@ribajs/bs4/src/components/bs4-slideshow/bs4-slideshow.component";
import { Bs4IconComponent } from "@ribajs/bs4/src/components/bs4-icon/bs4-icon.component";
import { SlideshowDemoModule } from "./slideshow.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(extrasModule);
riba.module.regist(SlideshowDemoModule);
riba.module.component.regists([Bs4SlideshowComponent, Bs4IconComponent]);

riba.bind(document.body, model);
