import { photoswipeModule } from "./index";

declare global {
  interface Window {
    photoswipeModule: typeof photoswipeModule;
  }
}

window.photoswipeModule = photoswipeModule;

export { photoswipeModule };
export default photoswipeModule;
