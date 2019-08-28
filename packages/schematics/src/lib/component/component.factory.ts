import {
  dirname,
  join,
  Path,
  strings,
} from '@angular-devkit/core';
import {
  apply,
  branchAndMerge,
  chain,
  filter,
  mergeWith,
  move,
  Rule,
  SchematicContext,
  SchematicsException,
  template,
  Tree,
  url,
} from '@angular-devkit/schematics';
import { debug as Debug } from 'debug';
import 'source-map-support/register';
import { isNullOrUndefined } from 'util';
import { IComponentOptions, IDeclarationOptions, ILocation } from '../../interfaces';
import { ExportDeclarator } from '../../utils/export.declarator';
import { IndexFinder } from '../../utils/index.finder';
import { NameParser } from '../../utils/name.parser';
import { mergeSourceRoot } from '../../utils/source-root.helpers';
import { DEFAULT_LANGUAGE } from '../defaults';

const ELEMENT_METADATA = 'components';
const ELEMENT_TYPE = 'component';

const debug = Debug('component:factory');

export function main(options: IComponentOptions): Rule {
  options = transform(options);
  return (tree: Tree, context: SchematicContext) => {
    return branchAndMerge(
      chain([
        mergeSourceRoot(options),
        // Adds an import to the modules source file if found
        addExportToIndex(options),
        mergeWith(generate(options)),
      ]),
    )(tree, context);
  };
}

function transform(source: IComponentOptions): IComponentOptions {
  const target: IComponentOptions = Object.assign({}, source);
  target.metadata = ELEMENT_METADATA;
  target.type = ELEMENT_TYPE;

  if (isNullOrUndefined(target.name)) {
    throw new SchematicsException('Option (name) is required.');
  }

  const location: ILocation = new NameParser().parse(target);

  debug('location name: ' + location.name);
  debug('location path: ' + location.path);

  target.name = strings.dasherize(location.name);
  target.path = strings.dasherize(location.path);
  target.language = target.language !== undefined ? target.language : DEFAULT_LANGUAGE;

  target.path = target.flat
    ? target.path
    : join(target.path as Path, target.name);

  debug('target path: ' + target.path);
  debug('target path: ' + target.path);

  return target;
}

function generate(options: IComponentOptions) {
  debug('generate');
  return (context: SchematicContext) => {
    if (!options.path) {
      throw new Error('options.path not found!');
    }
    const templatesPath = url('./files');
    return apply(templatesPath, [
      templateFilesFilter(options),
      template({
        ...strings,
        ...options,
      }),
      move(options.path),
    ])(context);
  };
}

function addExportToIndex(options: IComponentOptions): Rule {
  return (tree: Tree) => {
    if (options.skipImport !== undefined && options.skipImport) {
      return tree;
    }
    options.index = new IndexFinder(tree).find({
      name: options.name,
      path: dirname(options.path as Path),
      language: options.language,
    });
    if (!options.index) {
      return tree;
    }
    const contentBugger = tree.read(options.index);
    if (!contentBugger) {
      return tree;
    }
    const content = contentBugger.toString();
    const declarator: ExportDeclarator = new ExportDeclarator();
    tree.overwrite(
      options.index,
      declarator.declare(content, options as IDeclarationOptions),
    );
    return tree;
  };
}

/**
 * Filter template source files, e.g. filter .html files if the template engine is plain html
 */
function templateFilesFilter(options: IComponentOptions): Rule {
  return filter((path) => {
    debug('templateFilesFilter path: ' + path);
    if (options.templateEngine) {
      if (options.templateEngine === 'html' && path.endsWith('.pug')) {
        return false;
      }
      if (options.templateEngine === 'pug' && path.endsWith('.html')) {
        return false;
      }
    }
    if (options.language === 'js' && path.endsWith('.ts')) {
      return false;
    }
    if (options.language === 'ts' && path.endsWith('.js')) {
      return false;
    }
    if (!options.spec && path.endsWith('.spec.ts')) {
      return false;
    }
    return true;
  });
}
