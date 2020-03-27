import { AbstractRunner } from "../runners/index";
import { SchematicOption } from "./schematic.option";
import { Debugger } from "debug";
export declare class AbstractCollection {
    protected collection: string;
    protected runner: AbstractRunner;
    protected debug: Debugger;
    constructor(collection: string, runner: AbstractRunner);
    execute(name: string, options: SchematicOption[], extraFlags?: string): Promise<void>;
    private buildCommandLine;
    private buildOptions;
}
