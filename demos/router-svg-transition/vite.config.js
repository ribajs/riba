import { ribaViteConfig } from "@ribajs/vite-config";
import { resolve } from "path";

const cwd = process.cwd();

export default ribaViteConfig({
  input: {
    main: resolve(cwd, "src/index.html"),
    page: resolve(cwd, "src/page.html"),
  },
});
