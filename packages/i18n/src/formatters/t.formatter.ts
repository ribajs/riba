import { FormatterCreator, Formatter } from "@ribajs/core";
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

export const tFormatterWrapper: FormatterCreator = (
  localesService: LocalesService
) => {
  return {
    name: "t",
    read(
      translateMePathString: string,
      langcode: string /*, ...vars: string[]*/
    ) {
      return new Promise((resolve, reject) => {
        localesService.event.on("changed", () => {
          // console.debug('changed');
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
  } as Formatter;
};
