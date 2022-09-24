// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import { locale } from "./i18n";

export default createVuetify({
  locale,
  rtl: true,
  theme: {
    defaultTheme: "dark",
    themeCache: {
      get: (key: string) => localStorage.getItem(key),
      set: (key: string, value: string) => localStorage.setItem(key, value),
    },
  },
});
