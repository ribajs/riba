import { routerModule } from "./index";

declare global {
  interface Window {
    routerModule: typeof routerModule;
  }
}

window.routerModule = routerModule;

export { routerModule };
export default routerModule;
