import { octobercmsModule } from "./index.js";

declare global {
  interface Window {
    octobercmsModule: typeof octobercmsModule;
  }
}

window.octobercmsModule = octobercmsModule;

export { octobercmsModule };
export default octobercmsModule;
