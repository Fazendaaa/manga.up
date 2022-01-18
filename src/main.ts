import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'

createApp(App).use(store).use(VueViewer).use(router).mount('#app')
