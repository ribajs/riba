/**
 * Type definition for asset content files
 * @see https://vitejs.dev/guide/assets.html#importing-asset-as-string
 */
declare module "*?raw" {
  const textContent: string;
  export default textContent;
}

/**
 * Type definition for url asset strings
 * @see https://vitejs.dev/guide/assets.html#explicit-url-imports
 */
declare module "*?url" {
  const url: string;
  export default url;
}

/** Type definition for html-loader / html template files */
declare module "*.html" {
  const html: string;
  export default html;
}

/** Type definition for remark-loader / markdown template files */
declare module "*.md" {
  const markdown: string;
  export default markdown;
}
/** Type definition for pug-loader/ pug template files */
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

declare module "*.yml" {
  const jsObject: any;
  export default jsObject;
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
