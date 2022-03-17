import type { StrapiImage, StrapiImageFormatType } from "../types/index.js";
import { strapiImageFormatter } from "./strapi-image.js";
import { strapiFormatter } from "./strapi.js";

/**
 * Get strapi image url for format
 * @see https://strapi.io/documentation/developer-docs/latest/plugins/upload.html#configuration
 */
export const strapiImageUrlFormatter = {
  name: "strapi-image-url",
  read(
    image: Partial<StrapiImage>,
    format: StrapiImageFormatType | "original" = "thumbnail"
  ) {
    const imageFormat = strapiImageFormatter.read(image, format);
    return strapiFormatter.read(imageFormat?.url);
  }
};
