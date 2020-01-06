/// <reference types="debug" />
import { AbstractRunner } from './abstract.runner';
export declare class SchematicRunner extends AbstractRunner {
    static debug: import("debug").Debugger;
    constructor();
    static findClosestSchematicsBinary(path: string): string;
}
