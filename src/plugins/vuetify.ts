// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Vuetify
import { createVuetify } from "vuetify";
import { locale } from "./i18n";
import { light, coffee, neon, dark } from "./themes";

export default createVuetify({
  locale: {
    adapter: locale,
  },
  theme: {
    defaultTheme: "dark",
    themes: {
      light,
      neon,
      coffee,
      dark,
    },
  },
});
