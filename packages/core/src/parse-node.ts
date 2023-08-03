import { DataElement } from "./types/index.js";
import { MustacheTextBinder } from "./binders/mustache-text.binder.js";
import { View } from "./view.js";
import { BINDING } from "./constants/parser.js";
import { parseTemplate } from "./parse-template.js";

export function parseNode(
  view: View,
  node: DataElement,
  templateDelimiters: Array<string>,
) {
  /** If true stop / block the parseNode  recursion */
  let blockRecursion = false;

  node = node as DataElement;
  if (node.nodeType === Node.TEXT_NODE) {
    let tokens = null;

    if (node.data) {
      tokens = parseTemplate(node.data, templateDelimiters);
    }

    if (tokens && tokens.length) {
      for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const text = document.createTextNode(token.value);
        if (node.parentNode && text && node) {
          node.parentNode.insertBefore(text, node);
        }
        if (token.type === BINDING) {
          // TODO fix circular dependency
          view.buildBinding(text, null, token.value, MustacheTextBinder, null);
        }
      }
      if (node.parentNode) {
        node.parentNode.removeChild(node);
      }
    }
    blockRecursion = true;
  } else if (node.nodeType === Node.ELEMENT_NODE) {
    // traverse binds attributes and components
    blockRecursion = view.traverse(node);
  }
  if (!blockRecursion) {
    if (node.childNodes && node.childNodes.length > 0) {
      for (let i = 0; i < node.childNodes.length; i++) {
        const childNode = node.childNodes[i];
        if (childNode) {
          parseNode(view, childNode as DataElement, templateDelimiters);
        }
      }
    }
  }
}
