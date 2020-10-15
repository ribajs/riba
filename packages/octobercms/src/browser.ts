import { octobercmsModule } from "./index";

declare global {
  interface Window {
    octobercmsModule: typeof octobercmsModule;
  }
}

window.octobercmsModule = octobercmsModule;

export { octobercmsModule };
export default octobercmsModule;
