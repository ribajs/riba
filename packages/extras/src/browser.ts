import { extrasModule } from "./index.js";

declare global {
  interface Window {
    extrasModule: typeof extrasModule;
  }
}

window.extrasModule = extrasModule;

export { extrasModule };
export default extrasModule;
