import { extrasModule } from "./index";

declare global {
  interface Window {
    extrasModule: typeof extrasModule;
  }
}

window.extrasModule = extrasModule;

export { extrasModule };
export default extrasModule;
