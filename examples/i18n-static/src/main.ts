import { coreModule, Riba, Utils } from '@ribajs/core';
import { i18nModule, LocalesStaticService } from '@ribajs/i18n';
import I18nStaticModule from './i18n-static.module';

const locales = {
  de: {
    examples: {
      i18n: {
        switch_language: 'Klicke auf eine Sprache um sie zu ändern',
      },
      newsletter: {
        description_html: 'Abonnieren Sie unseren Newsletter und erhalten Sie <strong>10% Rabatt</strong> auf Ihren nächsten Einkauf.',
        input_value: 'Unbekannt',
        placeholder_last_name: 'Nachname',
        title: 'Melde dich für den Newsletter an',
      },
    },
  },
  en: {
    examples: {
      i18n: {
        switch_language: 'Click on a language to change it',
      },
      newsletter: {
        description_html: 'Subscribe to our newsletter and get <strong>10% off</strong> your next purchase.',
        input_value: 'Unknown',
        placeholder_last_name: 'Surname',
        title: 'Sign up for the newsletter',
      },
    },
  },
};

const riba = new Riba();
const localesService = new LocalesStaticService(locales);
const model = {};
riba.module.regist(coreModule);
riba.module.regist(i18nModule(localesService));
riba.module.regist(I18nStaticModule);
Utils.domIsReady(() => {
  riba.bind(document.body, model);
});
