import { VirtualConsole, JSDOM } from "jsdom";
import fetch from "node-fetch";
import { IgnoreConsole } from "./ignore-console";
import { StoreConsole } from "./store-console";
export const createDomForLayout = async (layout, output = "pipe") => {
    const virtualConsole = new VirtualConsole({
        captureRejections: true,
    });
    let pipeToConsole;
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
        runScripts: "outside-only",
        includeNodeLocations: true,
        beforeParse(window) {
            if (!window.fetch) {
                window.fetch = fetch;
            }
            window.console = pipeToConsole;
            if (!window.requestAnimationFrame) {
                window.requestAnimationFrame = () => {
                };
            }
            if (!window.indexedDB) {
                window.indexedDB = {
                    open: () => {
                        return {};
                    },
                };
            }
        },
    });
    return { dom, virtualConsole, pipeToConsole };
};
//# sourceMappingURL=dom.js.map