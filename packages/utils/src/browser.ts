import * as utils from "./index";

declare global {
  interface Window {
    utils: typeof utils;
  }
}

window.utils = utils;

export { utils };
export default utils;
