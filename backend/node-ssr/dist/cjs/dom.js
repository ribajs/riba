"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDomForLayout = void 0;
const jsdom_1 = require("jsdom");
const node_fetch_1 = __importDefault(require("node-fetch"));
const ignore_console_1 = require("./ignore-console");
const store_console_1 = require("./store-console");
const createDomForLayout = async (layout, output = "pipe") => {
    const virtualConsole = new jsdom_1.VirtualConsole({
        captureRejections: true,
    });
    let pipeToConsole;
    switch (output) {
        case "pipe":
            pipeToConsole = console;
            break;
        case "store":
            pipeToConsole = new store_console_1.StoreConsole();
            break;
        case "ignore":
            pipeToConsole = new ignore_console_1.IgnoreConsole();
            break;
        default:
            pipeToConsole = new ignore_console_1.IgnoreConsole();
            break;
    }
    virtualConsole.sendTo(pipeToConsole);
    const dom = new jsdom_1.JSDOM(layout, {
        virtualConsole,
        runScripts: "outside-only",
        includeNodeLocations: true,
        beforeParse(window) {
            if (!window.fetch) {
                window.fetch = node_fetch_1.default;
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
exports.createDomForLayout = createDomForLayout;
//# sourceMappingURL=dom.js.map