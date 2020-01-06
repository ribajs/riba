import { NpmRunner } from './npm.runner';
import { Runner } from '../../interfaces';
import { SchematicRunner } from './schematic.runner';
import { YarnRunner } from './yarn.runner';
export declare class RunnerFactory {
    static create(runner: Runner): NpmRunner | SchematicRunner | YarnRunner | undefined;
}
