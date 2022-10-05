const { defineConfig } = require("@vue/cli-service");

/**
 * @type {import('@vue/cli-service').ProjectOptions}
 */
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    port: 80,
    host: "0.0.0.0",
    allowedHosts: "all",
  },

  pwa: {
    name: "Manga.Up",
    themeColor: "#6fbece",
    msTileColor: "#6fbece",

    manifestOptions: {
      orientation: "any",
      iarc_rating_id: "ESRB",

      related_applications: [
        {
          platform: "play",
          url: "https://play.google.com/store/apps/details?id=solutions.fazenda.up.manga.twa",
          id: "solutions.fazenda.up.manga.twa",
        },
      ],

      screenshots: [
        {
          src: "screenshots/home.png",
          sizes: "383x852",
          type: "image/png",
        },
        {
          src: "screenshots/home_tablet.png",
          sizes: "571x828",
          type: "image/png",
        },
        {
          src: "screenshots/chapter.png",
          sizes: "382x852",
          type: "image/png",
        },
        {
          src: "screenshots/details_mobile.png",
          sizes: "384x853",
          type: "image/png",
        },
        {
          src: "screenshots/details_tablet.png",
          sizes: "576x827",
          type: "image/png",
        },
        {
          src: "screenshots/gallery.png",
          sizes: "573x828",
          type: "image/png",
        },
      ],

      shortcuts: [
        {
          name: "Home",
          url: "/",
          description: "Main page",
        },
        {
          name: "Search",
          url: "/search",
        },
        {
          name: "Favorites",
          url: "/favorites",
        },
        {
          name: "Settings",
          url: "/settings",
        },
      ],
    },
  },

  pluginOptions: {
    vuetify: {
      // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vuetify-loader
    },
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "src/locales/",
      enableInSFC: true,
    },
  },
});
