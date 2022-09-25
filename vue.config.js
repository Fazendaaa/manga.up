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
    color: "#FCFFE7",
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
