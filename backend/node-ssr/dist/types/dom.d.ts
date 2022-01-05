import { VirtualConsole, JSDOM } from "jsdom";
import type { OutputType, PipeConsole } from "./types/index";
export declare const createDomForLayout: (layout: string, output?: OutputType) => Promise<{
    dom: JSDOM;
    virtualConsole: VirtualConsole;
    pipeToConsole: PipeConsole;
}>;
