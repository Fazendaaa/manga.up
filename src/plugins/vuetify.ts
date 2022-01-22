// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
// import { createVueI18nAdapter } from "vuetify/locale/adapters/vue-i18n";
import { createI18n, useI18n } from "vue-i18n";
import { defaultLocale, messages } from "@/locales";

const i18n = new (createI18n as any)({
  legacy: false,
  locale: defaultLocale,
  fallbackLocale: "en",
  messages,
});

export default createVuetify({
  theme: {
    defaultTheme: "dark",
    themeCache: {
      get: (key: string) => localStorage.getItem(key),
      set: (key: string, value: string) => localStorage.setItem(key, value),
    },
  },
  rtl: true,
  // locale: createVueI18nAdapter({
  //   i18n,
  //   useI18n,
  // }),
});
// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
