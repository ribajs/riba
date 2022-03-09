import { leafletModule } from "./index.js";

declare global {
  interface Window {
    leafletModule: typeof leafletModule;
  }
}

window.leafletModule = leafletModule;

export { leafletModule };
export default leafletModule;
