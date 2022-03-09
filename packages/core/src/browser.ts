import { Riba, coreModule } from "./index.js";

declare global {
  interface Window {
    Riba: typeof Riba;
    riba: Riba;
    coreModule: typeof coreModule;
  }
}

// Global riba object^
const riba = new Riba();

// regist formatters
riba.module.regist(coreModule);

window.Riba = Riba;
window.riba = riba;
window.coreModule = coreModule;

export { Riba, coreModule, riba };
export default riba;
