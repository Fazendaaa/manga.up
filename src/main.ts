import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import i18n from "./i18n";
import Emitter, { TinyEmitter } from "tiny-emitter";
import GAuth, { GoogleOptions } from "vue3-google-oauth2";
import VueSocialSharing from "vue-social-sharing";
import Markdown from "vue3-markdown-it";
// @ts-expect-error: going to do later on
import VuePictureSwipe from "vue3-picture-swipe";

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
  .use(VueSocialSharing)
  .use(vuetify)
  .use(VuePictureSwipe)
  .use(Markdown)
  .use(GAuth, gAuthOptions)
  .mount("#app");
