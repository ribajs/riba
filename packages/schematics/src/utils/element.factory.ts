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
import { IDeclarationOptions, IElementOptions, ILocation } from '../interfaces';
import { DEFAULT_LANGUAGE } from '../lib/defaults';
import { ExportDeclarator } from './export.declarator';
import { IndexFinder } from './index.finder';
import { NameParser } from './name.parser';

export class ElementFactory {
  protected debug = Debug('binder:factory');
  target: IElementOptions;

  constructor(protected options: IElementOptions) {
    this.target = this.getTarget(options);
  }

  public generate() {
    this.debug('generate');
    return (context: SchematicContext) => {
      if (!this.target.path) {
        throw new Error('options.path not found!');
      }
      const templatesPath = url('./files');
      return apply(templatesPath, [
        this.templateFilesFilter(this.target),
        template({...strings, ...this.target}),
        move(this.target.path),
      ])(context);
    };
  }

  public addExportToIndex(): Rule {
    return (tree: Tree) => {
      if (!!this.target.skipImport) {
        return tree;
      }
      this.target.index = new IndexFinder(tree).find({
        name: this.target.name,
        path: this.target.path as Path,
        language: this.target.language,
        flat: this.target.flat,
      });
      if (!this.target.index) {
        return tree;
      }
      const contentBugger = tree.read(this.target.index);
      if (!contentBugger) {
        return tree;
      }
      const content = contentBugger.toString();
      const declarator: ExportDeclarator = new ExportDeclarator();
      tree.overwrite(
        this.target.index,
        declarator.declare(content, this.target as IDeclarationOptions),
      );
      return tree;
    };
  }

  protected getTarget(source: IElementOptions): IElementOptions {
    const target: IElementOptions = Object.assign({}, source);

    if (isNullOrUndefined(target.name)) {
      throw new SchematicsException('Option (name) is required.');
    }

    const location: ILocation = new NameParser().parse(target);

    target.name = strings.dasherize(location.name);
    target.path = strings.dasherize(location.path);
    target.language = target.language !== undefined ? target.language : DEFAULT_LANGUAGE;

    target.path = target.flat ? target.path : join(target.path as Path, target.name);

    this.debug('location name: ' + location.name);
    this.debug('target path: ' + target.path);

    return target;
  }

  /**
   * Filter template source files, e.g. filter .html files if the template engine is plain html
   */
  protected templateFilesFilter(options: IElementOptions): Rule {
    return filter((path) => {
      this.debug('templateFilesFilter path: ' + path);
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
}
