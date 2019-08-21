import { normalize, Path } from '@angular-devkit/core';
import { IDeclarationOptions } from '../interfaces';
import { PathSolver } from './path.solver';

export class ModuleImportDeclarator {
  constructor(private solver: PathSolver = new PathSolver()) {}

  public declare(content: string, options: IDeclarationOptions): string {
    const toInsert: string = this.buildLineToInsert(options);
    const importLines: string[] = this.findImports(content);
    const otherLines: string[] = this.findOtherLines(content, importLines);
    importLines.push(toInsert);
    return importLines.join('\n').concat(otherLines.join('\n'));
  }

  private findImports(content: string): string[] {
    return content.split('\n').filter(line => line.match(/import {/));
  }

  private findOtherLines(content: string, importLines: string[]) {
    return content.split('\n').filter(line => importLines.indexOf(line) < 0);
  }

  private buildLineToInsert(options: IDeclarationOptions): string {
    return `import { ${options.symbol} } from '${this.computeRelativePath(
      options,
    )}';\n`;
  }

  private computeRelativePath(options: IDeclarationOptions): string {
    let importModulePath: Path;
    if (options.type !== undefined) {
      importModulePath = normalize(
        `/${options.path}/${options.name}.${options.type}`,
      );
    } else {
      importModulePath = normalize(`/${options.path}/${options.name}`);
    }
    return this.solver.relative(options.module, importModulePath);
  }
}
