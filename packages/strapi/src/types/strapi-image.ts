import { StrapiImageFormats } from "./strapi-image-format";
export interface StrapiImage {
  formats: StrapiImageFormats;
  alternativeText: string | null;
  url: string;
}
