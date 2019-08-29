import { AbstractPackageManager } from './abstract.package-manager';
import { IPackageManagerCommands } from '../../interfaces';
export declare class NpmPackageManager extends AbstractPackageManager {
    constructor();
    readonly name: string;
    readonly cli: IPackageManagerCommands;
}
