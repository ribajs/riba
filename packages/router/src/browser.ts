import { routerModule } from "./index.js";

declare global {
  interface Window {
    routerModule: typeof routerModule;
  }
}

window.routerModule = routerModule;

export { routerModule };
export default routerModule;
