import "../scss/main.scss";

import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { Bs4TaggedImageDemoModule } from "./bs4-taggedimage-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(bs4Module.init());
riba.module.regist(extrasModule.init());
riba.module.regist(Bs4TaggedImageDemoModule.init());

riba.bind(document.body, model);
