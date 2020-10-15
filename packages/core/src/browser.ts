import { Riba, coreModule } from "./index";

declare global {
  interface Window {
    riba: Riba;
  }
}

// Global riba object^
const riba = new Riba();

// regist formatters
riba.module.regist(coreModule);

(window as any).riba = riba;

export { Riba, coreModule, riba };
export default riba;
