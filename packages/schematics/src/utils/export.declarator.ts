import { capitalize, classify } from '@angular-devkit/core/src/utils/strings';
import { IDeclarationOptions } from '../interfaces/declarations-options';
import { ElementExportDeclarator } from './element-export.declarator';
import { ModuleMetadataDeclarator } from './module-metadata.declarator';

export class ExportDeclarator {
  constructor(
    private exports: ElementExportDeclarator = new ElementExportDeclarator(),
    private metadata: ModuleMetadataDeclarator = new ModuleMetadataDeclarator(),
  ) {}

  public declare(content: string, options: IDeclarationOptions): string {
    options = this.computeSymbol(options);
    content = this.exports.declare(content, options);
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

  private computeSymbol(options: IDeclarationOptions): IDeclarationOptions {
    const target = Object.assign({}, options);
    if (options.type !== undefined) {
      target.symbol = classify(options.name).concat(capitalize(options.type));
    } else {
      target.symbol = classify(options.name);
    }
    return target;
  }
}
