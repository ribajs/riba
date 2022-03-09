import { monacoEditorModule } from "./index.js";

declare global {
  interface Window {
    monacoEditorModule: typeof monacoEditorModule;
  }
}

window.monacoEditorModule = monacoEditorModule;

export { monacoEditorModule };
export default monacoEditorModule;
