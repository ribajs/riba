"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const yargs_1 = __importDefault(require("yargs/yargs"));
const helpers_1 = require("yargs/helpers");
const ssr_service_1 = require("./ssr.service");
const constants_1 = require("./constants");
const start = async () => {
    const argv = await (0, yargs_1.default)((0, helpers_1.hideBin)(process.argv))
        .option("timeout", {
        alias: "t",
        type: "number",
        description: "Timeout if the SSR does not respond",
        default: 5000,
    })
        .option("root-tag", {
        alias: "r",
        type: "string",
        description: "The root tag is an html tag name you defined in your initial template. This will be exchanged with the tag name of the page component in the render process.",
        default: "ssr-root-page",
    })
        .option("component", {
        alias: "c",
        type: "string",
        description: "The page component tag name which will be exchanged with the tag name of the page component in the render process.",
        demandOption: true,
    })
        .option("engine", {
        alias: "e",
        type: "string",
        description: 'The template engine you use, e.g. "pug"',
        default: "pug",
    })
        .option("template-file", {
        alias: "f",
        type: "string",
        description: "The template file name of your entry template in which you defined the rootTag",
        default: "page-component.pug",
    })
        .option("source-file-dir", {
        alias: "s",
        type: "string",
        description: "The directory in which your javascript source files are stored",
        demandOption: true,
    })
        .option("template-dir", {
        alias: "d",
        type: "string",
        description: "The directory in which your template view files are stored",
        demandOption: true,
    })
        .option("pretty", {
        alias: "p",
        type: "string",
        description: "Prettify JSON output",
        default: false,
    }).argv;
    const engine = argv.engine;
    if (!constants_1.SUPPORTED_TEMPLATE_ENGINES.includes(engine)) {
        throw new Error(`The theme config must contain a "viewEngine" property of a supported template engine string but is "${engine}"!`);
    }
    const ssr = new ssr_service_1.SsrService({
        sourceFileDir: argv["source-file-dir"],
        templateDir: argv["template-dir"],
        defaultRootTag: argv["root-tag"],
        defaultTemplateEngine: engine,
        defaultTemplateFile: argv["template-file"],
    });
    const sharedContext = await ssr.getSharedContext({}, {});
    const page = await ssr.renderComponent({
        componentTagName: argv.component,
        sharedContext,
        pipeOutput: false,
    });
    console.log(JSON.stringify({ result: page }, null, argv.pretty ? 2 : undefined));
};
start();
//# sourceMappingURL=cli.js.map