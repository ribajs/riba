import { i18nModule } from "./index";

declare global {
  interface Window {
    i18nModule: typeof i18nModule;
  }
}

window.i18nModule = i18nModule;

export { i18nModule };
export default i18nModule;
