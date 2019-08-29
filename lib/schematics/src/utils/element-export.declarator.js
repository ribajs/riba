"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@angular-devkit/core");
class ElementExportDeclarator {
    constructor() { }
    declare(content, options) {
        const toInsert = this.buildLineToInsert(options);
        const importLines = this.findExports(content);
        const otherLines = this.findOtherLines(content, importLines);
        importLines.push(toInsert);
        return importLines.join('\n').concat(otherLines.join('\n'));
    }
    findExports(content) {
        return content.split('\n').filter(line => line.match(/export ({|\*)/));
    }
    findOtherLines(content, importLines) {
        return content.split('\n').filter(line => importLines.indexOf(line) < 0);
    }
    buildLineToInsert(options) {
        return `export { ${options.symbol} } from '${this.computeRelativePath(options)}';\n`;
    }
    computeRelativePath(options) {
        const targetFilename = `${options.name}.${options.type}`;
        const targetRelativeDirname = options.flat ? '' : options.name;
        const indexAbsolutPath = core_1.normalize(options.index);
        const indexAbsolutDirname = core_1.dirname(indexAbsolutPath);
        const targetAbsolutPath = core_1.normalize(core_1.join(indexAbsolutDirname, targetRelativeDirname, targetFilename));
        const targetRelativePath = `./${core_1.relative(indexAbsolutDirname, targetAbsolutPath)}`;
        return targetRelativePath;
    }
}
exports.ElementExportDeclarator = ElementExportDeclarator;
