import { Formatter } from "@ribajs/core/src/index.js";
import { I18nService } from "../services/i18n.service.js";
import { LocalesService } from "../types/locales-service";

const translate = async (
  translateMePathString: string,
  localesService: LocalesService,
  langcode?: string
) => {
  const properties = translateMePathString.split(".");
  if (!langcode) {
    langcode = localesService.getLangcode();
    if (!langcode) {
      return null;
    }
  }
  return localesService
    .get([langcode, ...properties] /*, vars */)
    .then((locale: string) => {
      return locale;
    })
    .catch((error: Error) => {
      console.error(error);
    });
};

export const tFormatter: Formatter = {
  name: "t",
  read(
    translateMePathString: string,
    langcode: string /*, ...vars: string[]*/
  ) {
    const localesService = I18nService.options.localesService;
    return new Promise((resolve, reject) => {
      localesService.event.on("changed", () => {
        translate(translateMePathString, localesService, langcode)
          .then((locale) => {
            resolve(locale as any);
          })
          .catch((error: Error) => {
            reject(error);
          });
      });

      localesService.event.on("ready", () => {
        translate(translateMePathString, localesService, langcode)
          .then((locale) => {
            resolve(locale as any);
          })
          .catch((error: Error) => {
            reject(error);
          });
      });

      if (localesService.ready) {
        translate(translateMePathString, localesService, langcode).then(
          (locale) => {
            resolve(locale);
          }
        );
      }
    });
  },
};
