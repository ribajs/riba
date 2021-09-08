import { coreModule, Riba } from "@ribajs/core";
import { podcastModule } from "@ribajs/podcast";
import { PodcastDemoModule } from "./podcast-demo.module";

const riba = new Riba();
const model = {};

// Register modules
riba.module.regist(coreModule);
riba.module.regist(podcastModule);
riba.module.regist(PodcastDemoModule);

// Bind Riba
riba.bind(document.body, model);
