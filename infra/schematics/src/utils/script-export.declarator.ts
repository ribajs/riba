import { dirname, join, normalize, relative, Path } from "@angular-devkit/core";
import { DeclarationOptions } from "../interfaces";

export class ScriptExportDeclarator {
  constructor() {
    /**/
  }

  public declare(
    content: string,
    options: DeclarationOptions,
    index: Path
  ): string {
    const toInsert: string = this.buildLineToInsert(options, index);
    const importLines: string[] = this.findExports(content);
    const otherLines: string[] = this.findOtherLines(content, importLines);
    importLines.push(toInsert);
    return importLines.join("\n").concat(otherLines.join("\n"));
  }

  private findExports(content: string): string[] {
    return content.split("\n").filter((line) => line.match(/export ({|\*)/));
  }

  private findOtherLines(content: string, importLines: string[]) {
    return content.split("\n").filter((line) => importLines.indexOf(line) < 0);
  }

  private buildLineToInsert(options: DeclarationOptions, index: Path): string {
    return `export { ${options.symbol} } from '${this.computeRelativePath(
      options,
      index
    )}';\n`;
  }

  private computeRelativePath(
    options: DeclarationOptions,
    index: Path
  ): string {
    const targetFilename = `${options.name}.${options.type}`;
    const targetRelativeDirname = options.flat ? "" : options.name;
    const indexAbsolutPath = normalize(index);
    const indexAbsolutDirname = dirname(indexAbsolutPath);
    const targetAbsolutPath = normalize(
      join(indexAbsolutDirname, targetRelativeDirname, targetFilename)
    );
    const targetRelativePath = `./${relative(
      indexAbsolutDirname,
      targetAbsolutPath
    )}`;
    return targetRelativePath;
  }
}
