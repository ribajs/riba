// See https://github.com/ribajs/riba/blob/master/packages/ssr/src/types/parsed-query.ts

export interface ParsedQs {
  [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
}
