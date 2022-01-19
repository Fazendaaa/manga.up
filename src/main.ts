import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { loadFonts } from "./plugins/webfontloader";
import "viewerjs/dist/viewer.css";
import VueViewer from "v-viewer";

loadFonts();

createApp(App).use(router).use(store).use(vuetify).use(VueViewer).mount("#app");
