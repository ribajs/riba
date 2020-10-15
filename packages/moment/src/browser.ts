import { momentModule } from "./index";

declare global {
  interface Window {
    momentModule: typeof momentModule;
  }
}

window.momentModule = momentModule;

export { momentModule };
export default momentModule;
