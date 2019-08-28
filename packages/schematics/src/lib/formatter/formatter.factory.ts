import {
  branchAndMerge,
  chain,
  mergeWith,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { IElementOptions } from '../../interfaces';
import { ElementFactory } from '../../utils/element.factory';
import { mergeSourceRoot } from '../../utils/source-root.helpers';

const ELEMENT_METADATA = 'formatters';
const ELEMENT_TYPE = 'formatter';

export function main(options: IElementOptions): Rule {
  options.metadata = options.metadata || ELEMENT_METADATA;
  options.type = options.type || ELEMENT_TYPE;
  const elementFactory = new ElementFactory(options);
  const rules = chain([
    mergeSourceRoot(options),
    // Adds an export to the index file
    elementFactory.addExportToIndex(),
    mergeWith(elementFactory.generate()),
  ]);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(rules)(tree, context);
  };
}
