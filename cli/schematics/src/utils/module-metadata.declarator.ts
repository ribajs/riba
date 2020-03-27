import { DeclarationOptions } from '../interfaces';
import { MetadataManager } from './metadata.manager';

export class ModuleMetadataDeclarator {
  public declare(content: string, options: DeclarationOptions): string {
    const manager = new MetadataManager(content);
    if (!options.symbol) {
      throw new Error('Symbol not found!');
    }
    const inserted = manager.insert(
      options.metadata,
      options.symbol,
      options.staticOptions,
    );
    return inserted;
  }
}
