import { Tokens } from "./types";
import { BINDING, TEXT } from "./constants/parser";

/**
 * Template parser and tokenizer for {{ mustache-style }} text content bindings.
 * Parses the template and returns a set of tokens, separating static portions
 * of text from binding declarations.
 * @param template
 * @param delimiters
 */
export function parseTemplate(template: string, delimiters: string[]) {
  let tokens: Tokens[] | null = null;
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
          type: TEXT,
          value: template.slice(lastIndex),
        });
      }

      break;
    } else {
      tokens = tokens || [];
      if (index > 0 && lastIndex < index) {
        tokens.push({
          type: TEXT,
          value: template.slice(lastIndex, index),
        });
      }

      lastIndex = index + open.length;
      index = template.indexOf(close, lastIndex);

      if (index < 0) {
        const substring = template.slice(lastIndex - open.length);
        const lastToken = tokens[tokens.length - 1];

        if (lastToken && lastToken.type === TEXT) {
          lastToken.value += substring;
        } else {
          tokens.push({
            type: TEXT,
            value: substring,
          });
        }

        break;
      }

      const value = template.slice(lastIndex, index).trim();

      tokens.push({
        type: BINDING,
        value,
      });

      lastIndex = index + close.length;
    }
  }

  return tokens;
}
