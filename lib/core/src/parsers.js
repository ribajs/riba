"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./services/utils");
const view_1 = require("./view");
/**
 * Used also in parsers.parseType
 * TODO outsource
 */
exports.PRIMITIVE = 0;
exports.KEYPATH = 1;
exports.TEXT = 0;
exports.BINDING = 1;
const QUOTED_STR = /^'.*'$|^".*"$/; // regex to test if string is wrapped in " or '
const DECLARATION_SPLIT = /((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g;
/**
 * Parser and tokenizer for getting the type and value from a string.
 * @param string
 */
function parseType(str) {
    let type = exports.PRIMITIVE;
    let value = str;
    if (str === undefined) {
        return { type, value: undefined };
    }
    if (QUOTED_STR.test(str)) {
        value = str.slice(1, -1);
    }
    else if (str === 'true') {
        value = true;
    }
    else if (str === 'false') {
        value = false;
    }
    else if (str === 'null') {
        value = null;
    }
    else if (str === 'undefined') {
        value = undefined;
    }
    else if (str === '') {
        value = undefined;
    }
    else if (!isNaN(Number(str))) {
        value = Number(str);
    }
    else if (utils_1.Utils.isJson(str)) {
        value = JSON.parse(str);
    }
    else {
        type = exports.KEYPATH;
    }
    return { type, value };
}
exports.parseType = parseType;
/**
 * Template parser and tokenizer for {{ mustache-style }} text content bindings.
 * Parses the template and returns a set of tokens, separating static portions
 * of text from binding declarations.
 * @param template
 * @param delimiters
 */
function parseTemplate(template, delimiters) {
    let tokens = null;
    const length = template.length;
    let index = 0;
    let lastIndex = 0;
    const open = delimiters[0];
    const close = delimiters[1];
    while (lastIndex < length) {
        index = template.indexOf(open, lastIndex);
        if (index < 0) {
            if (tokens) {
                tokens.push({
                    type: exports.TEXT,
                    value: template.slice(lastIndex),
                });
            }
            break;
        }
        else {
            tokens = tokens || [];
            if (index > 0 && lastIndex < index) {
                tokens.push({
                    type: exports.TEXT,
                    value: template.slice(lastIndex, index),
                });
            }
            lastIndex = index + open.length;
            index = template.indexOf(close, lastIndex);
            if (index < 0) {
                const substring = template.slice(lastIndex - close.length);
                const lastToken = tokens[tokens.length - 1];
                if (lastToken && lastToken.type === exports.TEXT) {
                    lastToken.value += substring;
                }
                else {
                    tokens.push({
                        type: exports.TEXT,
                        value: substring,
                    });
                }
                break;
            }
            const value = template.slice(lastIndex, index).trim();
            tokens.push({
                type: exports.BINDING,
                value,
            });
            lastIndex = index + close.length;
        }
    }
    return tokens;
}
exports.parseTemplate = parseTemplate;
function parseNode(view, node, templateDelimiters) {
    /** If true stop / block the parseNode  recursion */
    let block = false;
    node = node;
    // if node.nodeType === 3 === Node.TEXT_NODE
    if (node.nodeType === 3) {
        let tokens = null;
        // TODO why check data?
        if (node.data) {
            tokens = parseTemplate(node.data, templateDelimiters);
        }
        if (tokens && tokens.length) {
            for (let i = 0; i < tokens.length; i++) {
                const token = tokens[i];
                const text = document.createTextNode(token.value);
                if (node.parentNode) {
                    node.parentNode.insertBefore(text, node);
                }
                if (token.type === 1) {
                    // TODO fix any
                    view.buildBinding(text, null, token.value, view_1.View.mustacheTextBinder, null);
                }
            }
            if (node.parentNode) {
                node.parentNode.removeChild(node);
            }
        }
        block = true;
        // if node.nodeType === 1 === Node.ELEMENT_NODE
    }
    else if (node.nodeType === 1) {
        // traverse binds attributes
        block = view.traverse(node);
    }
    if (!block) {
        if (node.childNodes) {
            for (let i = 0; i < node.childNodes.length; i++) {
                parseNode(view, node.childNodes[i], templateDelimiters);
            }
        }
    }
}
exports.parseNode = parseNode;
/**
 * Parses an attribute argument to his keypath and splits the formatter names into a pipes array.
 * @param declaration e.g. `object.data | validate | json`
 *
 * if declaration is
 * ```
 * object.data | validate | json`
 * ``
 *
 * the result is
 * ```
 * {
 *    keypath: "object.data",
 *    pipes: ["validate", "json"]
 * }
 * ```
 */
function parseDeclaration(declaration) {
    const matches = declaration.match(DECLARATION_SPLIT);
    if (matches === null) {
        throw new Error('[View] No matches');
    }
    const pipes = matches.map((str) => {
        return str.trim();
    });
    const keypath = pipes.shift() || undefined;
    return {
        keypath,
        pipes,
    };
}
exports.parseDeclaration = parseDeclaration;
