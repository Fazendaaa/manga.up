import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/:catchAll(.*)*",
    name: "PageNotFound",
    component: () =>
      import(/* webpackChunkName: "reader" */ "../views/PageNotFoundView.vue"),
  },
  {
    path: "/reader/:id",
    name: "Reader",
    component: () =>
      import(/* webpackChunkName: "reader" */ "../views/ReaderView.vue"),
  },
  {
    path: "/settings/",
    name: "Settings",
    component: () =>
      import(/* webpackChunkName: "settings" */ "../views/SettingsView.vue"),
  },
  {
    path: "/search/",
    name: "Search",
    component: () =>
      import(/* webpackChunkName: "search" */ "../views/SearchView.vue"),
  },
  {
    path: "/favorites/",
    name: "Favorites",
    component: () =>
      import(/* webpackChunkName: "favorites" */ "../views/FavoritesView.vue"),
  },
  {
    path: "/firewall/",
    name: "Firewall",
    component: () =>
      import(/* webpackChunkName: "firewall" */ "../views/FirewallView.vue"),
  },
  {
    path: "/info/:id",
    name: "Info",
    component: () =>
      import(/* webpackChunkName: "info" */ "../views/InfoView.vue"),
  },
  {
    path: "/about/",
    name: "About",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/list/:name",
    name: "List",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ListView.vue"),
  },
  {
    path: "/share/:name",
    name: "Share",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ShareListView.vue"),
  },
  {
    path: "/scan/",
    name: "Scan",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/ScanView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
