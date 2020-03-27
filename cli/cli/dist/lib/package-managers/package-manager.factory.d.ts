import { AbstractPackageManager } from "./abstract.package-manager";
import { PackageManager } from "../../interfaces";
export declare class PackageManagerFactory {
    static create(name: PackageManager | string): AbstractPackageManager;
    static find(): Promise<AbstractPackageManager>;
}
