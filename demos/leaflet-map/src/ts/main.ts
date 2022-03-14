import { Riba } from "@ribajs/core/src/index.js";
import { leafletModule } from "@ribajs/leaflet-map";
import { LeafletDemoModule } from "./leaflet-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(leafletModule.init());
riba.module.regist(LeafletDemoModule.init());

riba.bind(document.body, model);
