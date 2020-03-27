import { Debugger } from "debug";
import { AbstractRunner } from "./abstract.runner";
export declare class SchematicRunner extends AbstractRunner {
    protected static debug: Debugger;
    constructor();
    static findClosestSchematicsBinary(path: string): string;
}
