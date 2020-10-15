import { shopifyModule } from "./index";

declare global {
  interface Window {
    shopifyModule: typeof shopifyModule;
  }
}

window.shopifyModule = shopifyModule;

export { shopifyModule };
export default shopifyModule;
