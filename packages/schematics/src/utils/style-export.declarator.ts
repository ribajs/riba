import { dirname, join, normalize, relative, Path } from '@angular-devkit/core';
import { IDeclarationOptions } from '../interfaces';

export class StyleExportDeclarator {
  constructor() {/**/}

  public declare(content: string, options: IDeclarationOptions, index: Path): string {
    const toInsert: string = this.buildLineToInsert(options, index);
    const lines: string[] = this.findLines(content);
    lines.push(toInsert);
    return lines.join('\n');
  }

  private findLines(content: string) {
    return content.split('\n');
  }

  private buildLineToInsert(options: IDeclarationOptions, index: Path): string {
    return `@import '${this.computeRelativePath(options, index)}';\n`;
  }

  private computeRelativePath(options: IDeclarationOptions, index: Path): string {
    const targetFilename = `${options.name}.${options.type}`;
    const targetRelativeDirname = options.flat ? '' : options.name;
    const indexAbsolutPath = normalize(index);
    const indexAbsolutDirname = dirname(indexAbsolutPath);
    const targetAbsolutPath = normalize(join(indexAbsolutDirname, targetRelativeDirname, targetFilename));
    const targetRelativePath = `./${relative(indexAbsolutDirname, targetAbsolutPath)}`;
    return targetRelativePath;
  }
}
