export type StrapiImageFormatType = "thumbnail" | "large" | "medium" | "small";

export interface StrapiImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  width: number;
  height: number;
  size: number;
  path: null | string;
  url: string;
}

export type StrapiImageFormats = {
  [format in StrapiImageFormatType]: StrapiImageFormat;
};
