import { coreModule, Riba } from "@ribajs/core";
import { podcastModule } from "@ribajs/podcast";
import { PodcastDemoModule } from "./podcast-demo.module.js";

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(podcastModule.init());
riba.module.register(PodcastDemoModule.init());

// Bind Riba
riba.bind(document.body, model);
