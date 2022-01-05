import { VirtualConsole, JSDOM } from "jsdom";
import fetch from "node-fetch";
import { IgnoreConsole } from "./ignore-console";
import { StoreConsole } from "./store-console";
import type { OutputType, PipeConsole } from "./types/index";

export const createDomForLayout = async (
  layout: string,
  output: OutputType = "pipe"
) => {
  const virtualConsole: VirtualConsole = new VirtualConsole({
    captureRejections: true,
  });

  let pipeToConsole: PipeConsole;
  switch (output) {
    case "pipe":
      pipeToConsole = console;
      break;
    case "store":
      pipeToConsole = new StoreConsole();
      break;
    case "ignore":
      pipeToConsole = new IgnoreConsole();
      break;
    default:
      pipeToConsole = new IgnoreConsole();
      break;
  }

  virtualConsole.sendTo(pipeToConsole);

  const dom = new JSDOM(layout, {
    virtualConsole,
    runScripts: "outside-only", // 'dangerously',
    includeNodeLocations: true,
    beforeParse(window) {
      if (!window.fetch) {
        window.fetch = fetch as any;
      }

      // Workaround, virtualConsole is not working?
      window.console = pipeToConsole;

      if (!window.requestAnimationFrame) {
        // Dummy
        (window as any).requestAnimationFrame = () => {
          /** Do nothing */
        };
      }

      if (!window.indexedDB) {
        /**
         * Dummy
         * Maybe in the future:
         * * https://www.npmjs.com/package/indexeddb
         * * https://github.com/metagriffin/indexeddb-js
         * * ...
         */
        (window as any).indexedDB = {
          open: () => {
            return {};
          },
        };
      }
    },
  });
  return { dom, virtualConsole, pipeToConsole };
};
