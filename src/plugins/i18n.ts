import { createI18n, useI18n } from "vue-i18n";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";

const messages = {
  en: {
    $vuetify: {
      dataIterator: {
        rowsPerPageText: "Items per page:",
        pageText: "{0}-{1} of {2}",
      },
    },
  },
  sv: {
    $vuetify: {
      dataIterator: {
        rowsPerPageText: "Element per sida:",
        pageText: "{0}-{1} av {2}",
      },
    },
  },
};

export const i18n = createI18n({
  legacy: false,
  locale: "sv",
  fallbackLocale: "en",
  messages,
});

export const locale = createVueI18nAdapter({ i18n, useI18n });
