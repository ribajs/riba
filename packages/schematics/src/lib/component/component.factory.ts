import {
  branchAndMerge,
  chain,
  mergeWith,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { ElementOptions } from '../../interfaces';
import { ElementFactory } from '../../utils/element.factory';
import { mergeSourceRoot } from '../../utils/source-root.helpers';

const ELEMENT_METADATA = 'components';
const ELEMENT_TYPE = 'component';

export function main(options: ElementOptions): Rule {
  options.metadata = options.metadata || ELEMENT_METADATA;
  options.type = options.type || ELEMENT_TYPE;
  const elementFactory = new ElementFactory(options);
  const rules = chain([
    mergeSourceRoot(options),
    // Adds an export to the index file
    elementFactory.addScriptExportToIndex(),
    elementFactory.addStyleImportToIndex(),
    mergeWith(elementFactory.generate()),
  ]);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(rules)(tree, context);
  };
}
