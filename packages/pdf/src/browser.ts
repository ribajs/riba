import { pdfModule } from "./index";

declare global {
  interface Window {
    pdfModule: typeof pdfModule;
  }
}

window.pdfModule = pdfModule;

export { pdfModule };
export default pdfModule;
