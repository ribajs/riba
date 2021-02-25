import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { Bs5SlideshowComponent } from "@ribajs/bs5/src/components/bs5-slideshow/bs5-slideshow.component";
import { Bs5IconComponent } from "@ribajs/bs5/src/components/bs5-icon/bs5-icon.component";
import { SlideshowDemoModule } from "./slideshow.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(extrasModule);
riba.module.regist(SlideshowDemoModule);
riba.module.component.regists([Bs5SlideshowComponent, Bs5IconComponent]);

riba.bind(document.body, model);
