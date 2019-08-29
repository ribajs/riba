"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
const schematics_1 = require("@angular-devkit/schematics");
const debug_1 = require("debug");
require("source-map-support/register");
const util_1 = require("util");
const defaults_1 = require("../lib/defaults");
const export_declarator_1 = require("./export.declarator");
const index_finder_1 = require("./index.finder");
const name_parser_1 = require("./name.parser");
class ElementFactory {
    constructor(options) {
        this.options = options;
        this.debug = debug_1.debug('binder:factory');
        this.target = this.getTarget(options);
    }
    generate() {
        this.debug('generate');
        return (context) => {
            if (!this.target.path) {
                throw new Error('options.path not found!');
            }
            const templatesPath = schematics_1.url('./files');
            return schematics_1.apply(templatesPath, [
                this.templateFilesFilter(this.target),
                schematics_1.template({ ...core_1.strings, ...this.target }),
                schematics_1.move(this.target.path),
            ])(context);
        };
    }
    addExportToIndex() {
        return (tree) => {
            if (!!this.target.skipImport) {
                return tree;
            }
            this.target.index = new index_finder_1.IndexFinder(tree).find({
                name: this.target.name,
                path: this.target.path,
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
            const declarator = new export_declarator_1.ExportDeclarator();
            tree.overwrite(this.target.index, declarator.declare(content, this.target));
            return tree;
        };
    }
    getTarget(source) {
        const target = Object.assign({}, source);
        if (util_1.isNullOrUndefined(target.name)) {
            throw new schematics_1.SchematicsException('Option (name) is required.');
        }
        const location = new name_parser_1.NameParser().parse(target);
        target.name = core_1.strings.dasherize(location.name);
        target.path = core_1.strings.dasherize(location.path);
        target.language = target.language !== undefined ? target.language : defaults_1.DEFAULT_LANGUAGE;
        target.path = target.flat ? target.path : core_1.join(target.path, target.name);
        this.debug('location name: ' + location.name);
        this.debug('target path: ' + target.path);
        return target;
    }
    /**
     * Filter template source files, e.g. filter .html files if the template engine is plain html
     */
    templateFilesFilter(options) {
        return schematics_1.filter((path) => {
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
exports.ElementFactory = ElementFactory;
