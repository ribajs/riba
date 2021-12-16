/**
 * See packages/core/src/formatters/type/json.formatter.ts
 */
export const toJsonString = (
  object: any,
  space = 0,
  replaceSingleQuote = true,
) => {
  let result = JSON.stringify(object, null, space);
  if (replaceSingleQuote && result) {
    result = result.replace(/'/g, `&#39;`);
  }
  result = result.replace(/"/g, `'`);
  return result;
};
