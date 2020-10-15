import { taggedImageModule } from "./index";

declare global {
  interface Window {
    taggedImageModule: typeof taggedImageModule;
  }
}

window.taggedImageModule = taggedImageModule;

export { taggedImageModule };
export default taggedImageModule;
