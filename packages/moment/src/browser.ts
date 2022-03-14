import { momentModule } from "./index.js";

declare global {
  interface Window {
    momentModule: typeof momentModule;
  }
}

window.momentModule = momentModule;

export { momentModule };
export default momentModule;
