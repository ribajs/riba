import { AbstractRunner } from '../runners';
import { AbstractCollection } from './abstract.collection';
import { SchematicOption } from './schematic.option';
export interface Schematic {
    name: string;
    alias: string;
}
export declare class Collection extends AbstractCollection {
    private static schematics;
    constructor(collection: string, runner?: AbstractRunner);
    execute(name: string, options: SchematicOption[]): Promise<void>;
    static getSchematics(): Schematic[];
    /**
     * Return the full schematic name by name or alias
     * @param name Name or alias
     */
    static getSchematic(name: string): Schematic | undefined;
}
