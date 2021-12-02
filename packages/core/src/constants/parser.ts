export const PRIMITIVE = 0;
export const KEYPATH = 1;
export const TEXT = 0;
export const BINDING = 1;

export const QUOTED_STR = /^'.*'$|^".*"$/; // regex to test if string is wrapped in " or '
export const DECLARATION_SPLIT =
  /((?:'[^']*')*(?:(?:[^|']*(?:'[^']*')+[^|']*)+|[^|]+))|^$/g;
