import { jqueryModule } from "./index.js";

declare global {
  interface Window {
    jqueryModule: typeof jqueryModule;
  }
}

window.jqueryModule = jqueryModule;

export { jqueryModule };
export default jqueryModule;
