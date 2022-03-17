import { coreModule, Riba } from "@ribajs/core";
import { podcastModule } from "@ribajs/podcast";
import { PodcastDemoModule } from "./podcast-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule.init());
riba.module.regist(podcastModule.init());
riba.module.regist(PodcastDemoModule.init());

// Bind Riba
riba.bind(document.body, model);
