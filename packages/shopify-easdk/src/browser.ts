import { shopifyEasdkModule } from "./index.js";

declare global {
  interface Window {
    shopifyEasdkModule: typeof shopifyEasdkModule;
  }
}

window.shopifyEasdkModule = shopifyEasdkModule;

export { shopifyEasdkModule };
export default shopifyEasdkModule;
