import { capitalize, classify } from '@angular-devkit/core/src/utils/strings';
import { Path } from '@angular-devkit/core';
import { ScriptExportDeclarator } from './script-export.declarator';
import { StyleExportDeclarator } from './style-export.declarator';
import { DeclarationOptions } from '../interfaces';

export class ExportDeclarator {
  constructor(
    private scriptExports: ScriptExportDeclarator = new ScriptExportDeclarator(),
    private styleExports: StyleExportDeclarator = new StyleExportDeclarator(),
  ) {}

  public declareScript(content: string, options: DeclarationOptions, index: Path): string {
    options = this.computeSymbol(options);
    content = this.scriptExports.declare(content, options, index);
    /**
     * TODO Riba
     * A metadata of `"components"` would add the component to the array of `components` in:
     * ```ts
     *   @Module({
     *     components: [EachItemExample4Component],
     *   })
     * ```
     * but Riba currently not supports the `@Module` decorator
     */
    // content = this.metadata.declare(content, options);
    return content;
  }

  public declareStyle(content: string, options: DeclarationOptions, index: Path): string {
    options = this.computeSymbol(options);
    content = this.styleExports.declare(content, options, index);
    return content;
  }

  private computeSymbol(options: DeclarationOptions): DeclarationOptions {
    const target = Object.assign({}, options);
    if (options.type !== undefined) {
      target.symbol = classify(options.name).concat(capitalize(options.type));
    } else {
      target.symbol = classify(options.name);
    }
    return target;
  }
}
