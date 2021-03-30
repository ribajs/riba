// import type { RequestDocument } from "graphql-request/dist/types";
// import "resize-observer-browser";

/** Type definition for html-loader */
declare module "*.html" {
  const html: string;
  export default html;
}
/** Type definition for pug-loader: https://github.com/pugjs/pug-loader */
declare module "*.pug" {
  const pug: (locals?: any) => string;
  export default pug;
}

declare module "*.svg" {
  const svg: string;
  export default svg;
}

declare module "*.png" {
  const png: string;
  export default png;
}

declare module "*.scss" {
  const scss: string;
  export default scss;
}

declare module "*.css" {
  const css: string;
  export default css;
}

declare module "*.gql" {
  const schema: any; // RequestDocument;
  export default schema;
}

declare module "*.graphql" {
  const schema: any; // RequestDocument;
  export default schema;
}

// Used by bs4 module
declare module "@sphinxxxx/color-conversion" {
  export default class Color {
    rgba: number[];
    hsla: number[];
    hslString: string;
    hex: string;
    hslaString: string;
    constructor(r: number | string, g?: number, b?: number, a?: number);
    /**
     * Splits a HEX string into its RGB(A) components
     */
    hexToRgb(input: string): number[];
    /**
     * Gets the RGB value from a CSS color name
     */
    nameToRgb(input: string): number[];
    rgbToHsl(input: number): number[];
    hslToRgb(input: number): number[];
    printRGB(alpha?: boolean): string;
    printHSL(alpha?: boolean): string;
    printHex(alpha?: boolean): string;
  }
}

// declare module "@popperjs/core" {
//   // See https://github.com/popperjs/popper-core/blob/master/src/types.js
//   export interface Options {
//     placement?: "start" | "end";
//     modifiers: Array<any>;
//     strategy: any;
//     onFirstUpdate?: (shape: any) => void;
//   }

//   // TODO
//   export type preventOverflow = any;
//   export type flip = any;
//   export type Boundary = any;

//   export function createPopper(
//     button: HTMLUnknownElement,
//     tooltip: HTMLUnknownElement,
//     options: Options
//   ): void;

//   export function createPopperLite(
//     button: HTMLUnknownElement,
//     tooltip: HTMLUnknownElement,
//     options: Options
//   ): void;
// }
