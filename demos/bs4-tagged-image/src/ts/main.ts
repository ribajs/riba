import "../scss/main.scss";

import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { Bs4TaggedImageDemoModule } from "./bs4-taggedimage-demo.module";

 global {
  interface Window {
    riba: Riba;
    model: any;
  }
}

const riba = (window.riba = new Riba());
const model = (window.model = window.model || {});

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs4Module);
riba.module.regist(extrasModule);
riba.module.regist(Bs4TaggedImageDemoModule);

riba.bind(document.body, model);
