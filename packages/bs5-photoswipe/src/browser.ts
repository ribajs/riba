import { bs5PhotoswipeModule } from "./index.js";

declare global {
  interface Window {
    bs5PhotoswipeModule: typeof bs5PhotoswipeModule;
  }
}

window.bs5PhotoswipeModule = bs5PhotoswipeModule;

export { bs5PhotoswipeModule };
export default bs5PhotoswipeModule;
