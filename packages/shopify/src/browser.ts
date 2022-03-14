import { shopifyModule } from "./index.js";

declare global {
  interface Window {
    shopifyModule: typeof shopifyModule;
  }
}

window.shopifyModule = shopifyModule;

export { shopifyModule };
export default shopifyModule;
