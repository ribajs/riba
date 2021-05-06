import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import {
  Bs5Service,
  Bs5SlideshowComponent,
  Bs5IconComponent,
} from "@ribajs/bs5";
import { SlideshowDemoModule } from "./slideshow.module";

const riba = new Riba();
const model = {};

Bs5Service.setSingleton();

// Register modules
riba.module.regist(coreModule);
riba.module.regist(extrasModule);
riba.module.regist(SlideshowDemoModule);
riba.module.component.regists([Bs5SlideshowComponent, Bs5IconComponent]);

riba.bind(document.body, model);
