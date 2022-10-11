import { Riba, coreModule, LifecycleService } from "@ribajs/core";
import { componentsModule } from "./components.module.js";

const lifecycle = LifecycleService.getInstance();
lifecycle.events.on("ComponentLifecycle:allBound", () => {
  console.info("[Riba.js] All components bound 👍");
});

lifecycle.events.on("ComponentLifecycle:error", (error: Error) => {
  console.warn("[Riba.js] Error on bound components 🫤", error);
});

lifecycle.events.on("ComponentLifecycle:noComponents", () => {
  console.warn("[Riba.js] No component to bound found ❓");
});

const riba = new Riba();
const model = {};

// Register modules
riba.module.register(coreModule.init());
riba.module.register(componentsModule.init());

const bindToElement = document.getElementById("rv-app");
if (!bindToElement) {
  throw new Error("Element with id 'rv-app' not found to bind riba on!");
}
riba.bind(bindToElement, model);
