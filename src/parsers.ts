import { isJson } from './utils';

import { IDataElement, View, TBlock } from './view';

/**
 * Used also in parsers.parseType
 * TODO outsource
 */
export const PRIMITIVE = 0;
export const KEYPATH = 1;
export const TEXT = 0;
export const BINDING = 1;

const QUOTED_STR = /^'.*'$|^".*"$/; // regex to test if string is wrapped in " or '
const DECLARATION_SPLIT = /((?:'[^']*')*(?:(?:[^\|']*(?:'[^']*')+[^\|']*)+|[^\|]+))|^$/g;

/**
 * Parser and tokenizer for getting the type and value from a string.
 * @param string 
 */
export function parseType(string: string) {
  let type = PRIMITIVE;
  let value: any = string;
  if (QUOTED_STR.test(string)) {
    value = string.slice(1, -1);
  } else if (string === 'true') {
    value = true;
  } else if (string === 'false') {
    value = false;
  } else if (string === 'null') {
    value = null;
  } else if (string === 'undefined') {
    value = undefined;
  } else if (string === '') {
    value = undefined;
  } else if (!isNaN(Number(string))) {
    value = Number(string);
  } else if (isJson(string)) {
    value = JSON.parse(string);
  } else {
    type = KEYPATH;
  }
  return {type: type, value: value};
}


export interface ITokens {
  type: number;
  value: string;
}

/**
 * Template parser and tokenizer for mustache-style text content bindings.
 * Parses the template and returns a set of tokens, separating static portions
 * of text from binding declarations.
 * @param template 
 * @param delimiters 
 */
export function parseTemplate(template: string, delimiters: string[]) {
  var tokens: ITokens[] | null = null;
  let length = template.length;
  let index = 0;
  let lastIndex = 0;
  let open = delimiters[0], close = delimiters[1];

  while (lastIndex < length) {
    index = template.indexOf(open, lastIndex);

    if (index < 0) {
      if (tokens) {
        tokens.push({
          type: TEXT,
          value: template.slice(lastIndex)
        });
      }

      break;
    } else {
      tokens = tokens || [];
      if (index > 0 && lastIndex < index) {
        tokens.push({
          type: TEXT,
          value: template.slice(lastIndex, index)
        });
      }

      lastIndex = index + open.length;
      index = template.indexOf(close, lastIndex);

      if (index < 0) {
        let substring = template.slice(lastIndex - close.length);
        let lastToken = tokens[tokens.length - 1];

        if (lastToken && lastToken.type === TEXT) {
          lastToken.value += substring;
        } else {
          tokens.push({
            type: TEXT,
            value: substring
          });
        }

        break;
      }

      let value = template.slice(lastIndex, index).trim();

      tokens.push({
        type: BINDING,
        value: value
      });

      lastIndex = index + close.length;
    }
  }

  return tokens;
}


export function parseNode(view: View, node: IDataElement, templateDelimiters: Array<string>) {
  let block: TBlock = false;

  // if node.nodeType === Node.TEXT_NODE
  node = ( node as IDataElement);
  if (node.nodeType === 3) {
    let tokens = null;

    // TODO why check data?
    if(node.data) {
      tokens = parseTemplate(node.data, templateDelimiters);
    }

    if (tokens && tokens.length) {
      if(!node.parentNode) {
        throw new Error('[View] Node (TEXT_NODE) has no parent node');
      }
      for (let i = 0; i < tokens.length; i++) {
        let token = tokens[i];
        let text = document.createTextNode(token.value);
        node.parentNode.insertBefore(text, node);
        if (token.type === 1) {
          view.buildBinding(text, null, token.value, View.textBinder, null);
        }
      }
      node.parentNode.removeChild(node);
    }
    block = true;
  } else if (node.nodeType === 1) {
    block = view.traverse(node);
  }

  if (!block) {
    if(node.childNodes) {
      for (let i = 0; i < node.childNodes.length; i++) {
        parseNode(view, (node.childNodes[i] as IDataElement), templateDelimiters);
      }
    }
  }
}

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
export function parseDeclaration(declaration: string) {
  let matches = declaration.match(DECLARATION_SPLIT);
  if(matches === null) {
    throw new Error('[View] No matches');
  }
  let pipes = matches.map((str: string) => {
    return str.trim();
  });
  let keypath = pipes.shift();
  return {
    keypath,
    pipes,
  }
}