import { ribaViteConfig } from "@ribajs/vite-config";
import { resolve } from "path";

const cwd = process.cwd();

export default ribaViteConfig({
  input: {
    main: resolve(cwd, "src/index.html"),
    "page-1": resolve(cwd, "src/page-1.html"),
    "page-2": resolve(cwd, "src/page-2.html"),
  },
});

