import { shopifyTDAModule } from "./index.js";

declare global {
  interface Window {
    shopifyTDAModule: typeof shopifyTDAModule;
  }
}

window.shopifyTDAModule = shopifyTDAModule;

export { shopifyTDAModule };
export default shopifyTDAModule;
