import en from "@/locales/en";
import pt from "@/locales/pt";
import { createI18n, useI18n } from "vue-i18n";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";

const messages = {
  en,
  pt,
};

export const availableTranslations = ["en", "pt"];

export const i18n = createI18n({
  locale:
    undefined !== localStorage.getItem("translation")
      ? (localStorage.getItem("translation") as string)
      : "en",
  messages,
  legacy: false,
  fallbackLocale: "en",
});

export const locale = createVueI18nAdapter({ i18n, useI18n });
