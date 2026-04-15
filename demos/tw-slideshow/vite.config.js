import tailwindcss from "@tailwindcss/vite";
import { ribaViteConfig } from "@ribajs/vite-config";

const config = ribaViteConfig();
config.plugins = [...(config.plugins || []), tailwindcss()];
export default config;
