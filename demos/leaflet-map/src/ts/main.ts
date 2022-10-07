import { Riba } from "@ribajs/core";
import { leafletModule } from "@ribajs/leaflet-map";
import { LeafletDemoModule } from "./leaflet-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(leafletModule.init());
riba.module.register(LeafletDemoModule.init());

riba.bind(document.body, model);
