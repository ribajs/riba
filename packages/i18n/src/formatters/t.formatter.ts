import { Debug, IModuleFormatterWrapper } from '@ribajs/core';
import { ALocalesService } from '../services/locales-base.service';

const translate = async (translateMePathString: string, localesService: ALocalesService, langcode?: string) => {
  const properties = translateMePathString.split('.');
  if (!langcode) {
    langcode = localesService.getLangcode();
  }
  return localesService.get([langcode, ...properties]/*, vars */)
  .then((locale: string) => {
    return locale;
  })
  .catch((error: Error) => {
    console.error(error);
  });
};

const debug = Debug('formatter:t');

export const tFormatterWrapper = (localesService: ALocalesService): IModuleFormatterWrapper => {
  return {
    name: 't',
    formatter: async (translateMePathString: string, langcode: string, ...vars: string[]) => {
      debug('formatter t', translateMePathString, langcode);
      if (localesService.ready) {
        return translate(translateMePathString, localesService, langcode)
        .then((locale) => {
          debug('locale');
          return locale;
        });
      } else {
        return new Promise((resolve, reject) => {
          localesService.event.on('ready', () => {
            translate(translateMePathString, localesService, langcode)
            .then((locale) => {
              debug('locale');
              resolve(locale as any);
            })
            .catch((error: Error) => {
              reject(error);
            });
          });
        });
      }
    },
  };
};
