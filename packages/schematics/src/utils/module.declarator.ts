import { capitalize, classify } from '@angular-devkit/core/src/utils/strings';
import { IDeclarationOptions } from '../interfaces/declarations-options';
import { ModuleImportDeclarator } from './module-import.declarator';
import { ModuleMetadataDeclarator } from './module-metadata.declarator';

export class ModuleDeclarator {
  constructor(
    private imports: ModuleImportDeclarator = new ModuleImportDeclarator(),
    private metadata: ModuleMetadataDeclarator = new ModuleMetadataDeclarator(),
  ) {}

  public declare(content: string, options: IDeclarationOptions): string {
    options = this.computeSymbol(options);
    content = this.imports.declare(content, options);
    content = this.metadata.declare(content, options);
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
