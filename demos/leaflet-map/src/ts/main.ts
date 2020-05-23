import { bs4Module } from "@ribajs/bs4";
import { coreModule, Riba } from "@ribajs/core";
import { extrasModule } from "@ribajs/extras";
import { leafletModule } from "@ribajs/leaflet-map";
import { LeafletDemoModule } from "./leaflet-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(bs4Module);
riba.module.regist(extrasModule);
riba.module.regist(leafletModule);
riba.module.regist(LeafletDemoModule);

riba.bind(document.body, model);
