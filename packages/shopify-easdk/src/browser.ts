import { shopifyEasdkModule } from "./index";

declare global {
  interface Window {
    shopifyEasdkModule: typeof shopifyEasdkModule;
  }
}

window.shopifyEasdkModule = shopifyEasdkModule;

export { shopifyEasdkModule };
export default shopifyEasdkModule;
