import { existsSync } from "fs";
import { join, sep } from "path";
import { debug as Debug } from "debug";
import { Debugger } from "debug";
import { AbstractRunner } from "./abstract.runner";

export class SchematicRunner extends AbstractRunner {
  protected static debug: Debugger = Debug("schematic:runner");

  constructor() {
    super(`"${SchematicRunner.findClosestSchematicsBinary(__dirname)}"`);
  }

  public static findClosestSchematicsBinary(path: string): string {
    const segments = path.split(sep);
    const binaryPath = ["node_modules", ".bin", "schematics"];

    const combineSegments = (pkgLastIndex: number) => [
      sep,
      ...segments.slice(0, pkgLastIndex),
      ...binaryPath,
    ];
    const globalBinPathSegments = combineSegments(
      segments.lastIndexOf("cli") + 1
    );
    const schematicsGlobalPath = join(...globalBinPathSegments);
    if (existsSync(schematicsGlobalPath)) {
      return schematicsGlobalPath;
    }

    const localBinPathSegments = combineSegments(
      segments.lastIndexOf("node_modules")
    );
    const schematicsLocalPath = join(...localBinPathSegments);
    if (existsSync(schematicsLocalPath)) {
      return schematicsLocalPath;
    }
    const schematicsBin = join(
      __dirname,
      "../../..",
      "node_modules/.bin/schematics"
    );
    this.debug("Äschematics binary: " + schematicsBin);
    return schematicsBin;
  }
}
