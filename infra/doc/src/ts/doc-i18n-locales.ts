/**
 * Locales for the documentation site i18n examples (binders, switcher, static demo).
 * Top-level keys must be language codes — the same shape as LocalesStaticService expects.
 */
export const docI18nLocales = {
  de: {
    examples: {
      i18n: {
        switch_language:
          "Klicke auf eine Sprache um sie zu ändern",
      },
      newsletter: {
        description_html:
          "Abonnieren Sie unseren Newsletter und erhalten Sie <strong>10% Rabatt</strong> auf Ihren nächsten Einkauf.",
        input_value: "Unbekannt",
        placeholder_last_name: "Nachname",
        title: "Melde dich für den Newsletter an",
      },
    },
  },
  en: {
    examples: {
      i18n: {
        switch_language: "Click on a language to change it",
      },
      newsletter: {
        description_html:
          "Subscribe to our newsletter and get <strong>10% off</strong> your next purchase.",
        input_value: "Unknown",
        placeholder_last_name: "Surname",
        title: "Sign up for the newsletter",
      },
    },
  },
};
