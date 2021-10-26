import type {
  StrapiImage,
  StrapiImageFormat,
  StrapiImageFormatType,
} from "..//types";

/**
 * Get strapi image for format
 * @see https://strapi.io/documentation/developer-docs/latest/plugins/upload.html#configuration
 */
export const strapiImageFormatter = {
  name: "strapi-image",
  read(
    image: Partial<StrapiImage>,
    format: StrapiImageFormatType | "original" = "thumbnail"
  ) {
    let imageFormat: StrapiImageFormat | undefined = image?.formats?.thumbnail;
    switch (format) {
      case "original":
        return image;
      case "large":
        imageFormat =
          image?.formats?.large ||
          image?.formats?.medium ||
          image?.formats?.small ||
          image?.formats?.thumbnail;
        break;
      case "medium":
        imageFormat =
          image?.formats?.medium ||
          image?.formats?.small ||
          image?.formats?.thumbnail;
        break;
      case "small":
        imageFormat = image?.formats?.small || image?.formats?.thumbnail;
        break;
      case "thumbnail":
        imageFormat = image?.formats?.thumbnail;
        break;
      default:
        throw new Error("Unknown image format: " + format + " !");
    }
    return imageFormat;
  },
};
