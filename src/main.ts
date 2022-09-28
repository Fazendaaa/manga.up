import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
// import { loadFonts } from "./plugins/webfontloader";
import { i18n } from "./plugins/i18n";
import VueSocialSharing from "vue-social-sharing";
import Markdown from "vue3-markdown-it";
import "./registerServiceWorker";

// loadFonts();

const app = createApp(App);

app
  .use(i18n)
  .use(router)
  .use(store)
  .use(VueSocialSharing)
  .use(vuetify)
  .use(Markdown)
  .mount("#app");
