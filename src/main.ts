import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";
import i18n from "./i18n";
import Emitter, { TinyEmitter } from "tiny-emitter";
import GAuth, { GoogleOptions } from "vue3-google-oauth2";

loadFonts();

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $msalInstance: Record<string, unknown>;
    $emitter: TinyEmitter;
  }
}

const app = createApp(App);

const gAuthOptions: GoogleOptions = {
  clientId:
    "441437625098-7fl84esjg8l4ogov5s6fuuim8slspkj5.apps.googleusercontent.com",
  scope: "email",
  prompt: "consent",
  fetch_basic_profile: false,
};

app.config.globalProperties.$msalInstance = {};
app.config.globalProperties.$emitter = new Emitter();

app
  .use(i18n)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(VueViewer)
  .use(GAuth, gAuthOptions)
  .mount("#app");
