import en from "@/locales/en";
import pt from "@/locales/pt";
import { createI18n, useI18n } from "vue-i18n";
import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";

const messages = {
  en,
  pt,
};

export const availableTranslations = ["en", "pt"];

// @ts-expect-error: any
export const i18n = new createI18n({
  legacy: false,
  locale:
    undefined !== localStorage.getItem("translation")
      ? (localStorage.getItem("translation") as string)
      : "pt",
  fallbackLocale: "en",
  messages,
});

export const locale = createVueI18nAdapter({ i18n, useI18n });
