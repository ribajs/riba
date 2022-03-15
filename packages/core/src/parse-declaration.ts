import { ParsedDeclarations } from "./types/index.js";
import { DECLARATION_SPLIT } from "./constants/parser.js";

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
export function parseDeclaration(declaration: string): ParsedDeclarations {
  const matches = declaration.match(DECLARATION_SPLIT);
  if (matches === null) {
    throw new Error("[View] No matches");
  }
  const pipes = matches.map((str: string) => {
    return str.trim();
  });
  const keypath = pipes.shift() || undefined;

  return {
    keypath,
    pipes
  } as ParsedDeclarations;
}
