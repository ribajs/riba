import { StrapiImageFormats } from "./strapi-image-format.js";
export interface StrapiImage {
  formats: StrapiImageFormats;
  alternativeText: string | null;
  url: string;
}
