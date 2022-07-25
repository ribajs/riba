import { Riba } from "@ribajs/core";
import { leafletModule } from "@ribajs/leaflet-map";
import { LeafletDemoModule } from "./leaflet-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(leafletModule.init());
riba.module.regist(LeafletDemoModule.init());

riba.bind(document.body, model);
