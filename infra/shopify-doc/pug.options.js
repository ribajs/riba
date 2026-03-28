import { createRequire } from "module";
const require = createRequire(import.meta.url);

const ribaPjson = require("../../package.json");
const icons = require("@ribajs/iconset/dist/svg.json");

export default {
  riba: ribaPjson,
  icons,
};
