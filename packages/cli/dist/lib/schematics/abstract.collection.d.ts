/// <reference types="debug" />
import { AbstractRunner } from '../runners';
import { SchematicOption } from './schematic.option';
export declare class AbstractCollection {
    protected collection: string;
    protected runner: AbstractRunner;
    debug: import("debug").Debugger;
    constructor(collection: string, runner: AbstractRunner);
    execute(name: string, options: SchematicOption[], extraFlags?: string): Promise<void>;
    private buildCommandLine;
    private buildOptions;
}
